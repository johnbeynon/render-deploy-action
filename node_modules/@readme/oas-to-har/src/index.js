const extensions = require('@readme/oas-extensions');
const { Operation, utils } = require('oas');
const parseDataUrl = require('parse-data-url');

const configureSecurity = require('./lib/configure-security');
const removeUndefinedObjects = require('./lib/remove-undefined-objects');
const formatStyle = require('./lib/style-formatting');

const { findSchemaDefinition, getSchema, jsonSchemaTypes } = utils;

function formatter(values, param, type, onlyIfExists) {
  if (param.style) {
    const value = values[type][param.name];
    // Note: Technically we could send everything through the format style and choose the proper default for each
    //  `in` type (e.g. query defaults to form).
    return formatStyle(value, param);
  }

  let value;

  // Handle missing values
  if (typeof values[type][param.name] !== 'undefined') {
    value = values[type][param.name];
  } else if (onlyIfExists && !param.required) {
    value = undefined;
  } else if (param.required && param.schema && param.schema.default) {
    value = param.schema.default;
  } else if (type === 'path') {
    // If we don't have any values for the path parameter, just use the name of the parameter as the value so we don't
    // try try to build a URL to something like `https://example.com/undefined`.
    return param.name;
  }

  // Handle file uploads. Specifically arrays of file uploads which need to be formatted very specifically.
  if (param.schema && param.schema.type === 'array' && param.schema.items && param.schema.items.format === 'binary') {
    return JSON.stringify(value);
  }

  if (value !== undefined) {
    // Query params should always be formatted, even if they don't have a `style` serialization configured.
    if (type === 'query') {
      return formatStyle(value, param);
    }

    return value;
  }

  return undefined;
}

function multipartBodyToFormatterParams(multipartBody, oasMediaTypeObject) {
  const schema = oasMediaTypeObject.schema;
  const encoding = oasMediaTypeObject.encoding;

  if (typeof multipartBody === 'object' && multipartBody !== null) {
    return Object.keys(multipartBody)
      .map(key => {
        // If we have an incoming parameter, but it's not in the schema
        //    ignore it
        if (!schema.properties[key]) {
          return false;
        }

        const paramEncoding = encoding ? encoding[key] : undefined;

        return {
          name: key,
          // If the style isn't defined, use the default
          style: paramEncoding ? paramEncoding.style : undefined,
          // If explode isn't defined, use the default
          explode: paramEncoding ? paramEncoding.explode : undefined,
          required: schema.required && schema.required.includes(key),
          schema: schema.properties[key],
          in: 'body',
        };
      })
      .filter(Boolean);
  }

  // Pretty sure that we'll never have anything but an object for multipart bodies, so returning empty array if we get anything else.
  return [];
}

const defaultFormDataTypes = Object.keys(jsonSchemaTypes).reduce((prev, curr) => {
  return Object.assign(prev, { [curr]: {} });
}, {});

function getResponseContentType(content) {
  const types = Object.keys(content) || [];

  let type = 'application/json';
  if (types && types.length) {
    type = types[0];
  }

  return type;
}

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
}

function stringify(json) {
  return JSON.stringify(removeUndefinedObjects(typeof json.RAW_BODY !== 'undefined' ? json.RAW_BODY : json));
}

function stringifyParameter(param) {
  if (param === null || isPrimitive(param)) {
    return param;
  } else if (Array.isArray(param) && param.every(isPrimitive)) {
    return String(param);
  }

  return JSON.stringify(param);
}

function appendHarValue(harParam, name, value, addtlData = {}) {
  if (typeof value === 'undefined') return;

  if (Array.isArray(value)) {
    // If the formatter gives us an array, we're expected to add each array value as a new parameter item with the same parameter name
    value.forEach(singleValue => {
      appendHarValue(harParam, name, singleValue);
    });
  } else if (typeof value === 'object' && value !== null) {
    // If the formatter gives us an object, we're expected to add each property value as a new parameter item, each with the name of the property
    Object.keys(value).forEach(key => {
      appendHarValue(harParam, key, value[key]);
    });
  } else {
    // If the formatter gives us a non-array, non-object, we add it as is
    harParam.push({
      ...addtlData,
      name,
      value: String(value),
    });
  }
}

module.exports = (
  oas,
  operationSchema = { path: '', method: '' },
  values = {},
  auth = {},
  opts = {
    // If true, the operation URL will be rewritten and prefixed with https://try.readme.io/ in order to funnel requests
    // through our CORS-friendly proxy.
    proxyUrl: false,
  }
) => {
  let operation = operationSchema;
  if (!(operationSchema instanceof Operation)) {
    operation = new Operation(oas, operationSchema.path, operationSchema.method, operationSchema);
  }

  const apiDefinition = oas.getDefinition();

  const formData = {
    ...defaultFormDataTypes,
    server: {
      selected: 0,
      variables: oas.defaultVariables(0),
    },
    ...values,
  };

  // If the incoming `server.variables` is missing variables let's pad it out with defaults.
  formData.server.variables = {
    ...oas.defaultVariables(formData.server.selected),
    ...formData.server.variables,
  };

  const har = {
    cookies: [],
    headers: [],
    headersSize: 0,
    queryString: [],
    postData: {},
    bodySize: 0,
    method: operation.method.toUpperCase(),
    url: `${oas.url(formData.server.selected, formData.server.variables)}${operation.path}`.replace(/\s/g, '%20'),
    httpVersion: 'HTTP/1.1',
  };

  if (opts.proxyUrl) {
    if (extensions.getExtension(extensions.PROXY_ENABLED, oas, operation)) {
      har.url = `https://try.readme.io/${har.url}`;
    }
  }

  // Does this operation have any parameters?
  const parameters = [];
  function addParameter(param) {
    if (param.$ref) {
      parameters.push(findSchemaDefinition(param.$ref, apiDefinition));
    } else {
      parameters.push(param);
    }
  }

  operation.getParameters().forEach(addParameter);

  // Does this operation have any common parameters?
  if (
    apiDefinition &&
    apiDefinition.paths &&
    apiDefinition.paths[operation.path] &&
    apiDefinition.paths[operation.path].parameters
  ) {
    apiDefinition.paths[operation.path].parameters.forEach(addParameter);
  }

  har.url = har.url.replace(/{([-_a-zA-Z0-9[\]]+)}/g, (full, key) => {
    if (!operation || !parameters) return key; // No path params at all

    // Find the path parameter or set a default value if it does not exist
    const parameter = parameters.find(param => param.name === key) || { name: key };

    // The library that handles our style processing already encodes uri elements. For everything else we need to handle it here.
    if (!parameter.style) {
      return encodeURIComponent(formatter(formData, parameter, 'path'));
    }

    return formatter(formData, parameter, 'path');
  });

  const queryStrings = parameters && parameters.filter(param => param.in === 'query');
  if (queryStrings && queryStrings.length) {
    queryStrings.forEach(queryString => {
      const value = formatter(formData, queryString, 'query', true);
      appendHarValue(har.queryString, queryString.name, value);
    });
  }

  // Do we have any `cookie` parameters on the operation?
  const cookies = parameters && parameters.filter(param => param.in === 'cookie');
  if (cookies && cookies.length) {
    cookies.forEach(cookie => {
      const value = formatter(formData, cookie, 'cookie', true);
      appendHarValue(har.cookies, cookie.name, value);
    });
  }

  // Does this response have any documented content types?
  if (operation.schema.responses) {
    Object.keys(operation.schema.responses).some(response => {
      if (!operation.schema.responses[response].content) return false;

      // if there is an Accept header specified in the form, we'll use that instead.
      if (formData.header.Accept) return true;

      har.headers.push({
        name: 'Accept',
        value: getResponseContentType(operation.schema.responses[response].content),
      });

      return true;
    });
  }

  // Do we have any `header` parameters on the operation?
  let hasContentType = false;
  let contentType = operation.getContentType();
  const headers = parameters && parameters.filter(param => param.in === 'header');
  if (headers && headers.length) {
    headers.forEach(header => {
      const value = formatter(formData, header, 'header', true);
      if (typeof value === 'undefined') return;

      if (header.name.toLowerCase() === 'content-type') {
        hasContentType = true;
        contentType = String(value);
      }
      appendHarValue(har.headers, header.name, value);
    });
  }

  // Are there `x-headers` static headers configured for this OAS?
  const userDefinedHeaders = extensions.getExtension(extensions.HEADERS, oas, operation);
  if (userDefinedHeaders) {
    userDefinedHeaders.forEach(header => {
      if (header.key.toLowerCase() === 'content-type') {
        hasContentType = true;
        contentType = String(header.value);
      }

      har.headers.push({
        name: header.key,
        value: String(header.value),
      });
    });
  }

  // Do we have an `Accept` header set up in the form, but it hasn't been added yet?
  if (formData.header && formData.header.Accept && har.headers.find(hdr => hdr.name === 'Accept') === undefined) {
    har.headers.push({
      name: 'Accept',
      value: String(formData.header.Accept),
    });
  }

  let requestBody = getSchema(operation.schema, apiDefinition);
  if (requestBody) {
    requestBody = requestBody.schema;
  } else {
    requestBody = { schema: {} };
  }

  if (requestBody.schema && Object.keys(requestBody.schema).length) {
    if (operation.isFormUrlEncoded()) {
      if (Object.keys(formData.formData).length) {
        const cleanFormData = removeUndefinedObjects(JSON.parse(JSON.stringify(formData.formData)));
        if (cleanFormData !== undefined) {
          har.postData.params = [];
          har.postData.mimeType = 'application/x-www-form-urlencoded';

          Object.keys(cleanFormData).forEach(name => {
            har.postData.params.push({
              name,
              value: stringifyParameter(cleanFormData[name]),
            });
          });
        }
      }
    } else if (
      'body' in formData &&
      formData.body !== undefined &&
      (isPrimitive(formData.body) || Object.keys(formData.body).length)
    ) {
      const isMultipart = operation.isMultipart();
      const isJSON = operation.isJson();

      if (isMultipart || isJSON) {
        try {
          let cleanBody = removeUndefinedObjects(JSON.parse(JSON.stringify(formData.body)));

          if (isMultipart) {
            har.postData.mimeType = 'multipart/form-data';
            har.postData.params = [];

            // Discover all `{ type: string, format: binary }` properties the schema. If there are any, then that means
            // that we're dealing with a `multipart/form-data` request and need to treat the payload as `postData.params`.
            const binaryTypes = Object.keys(requestBody.schema.properties).filter(
              key => requestBody.schema.properties[key].format === 'binary'
            );

            if (cleanBody !== undefined) {
              const multipartParams = multipartBodyToFormatterParams(
                formData.body,
                operation.schema.requestBody.content['multipart/form-data']
              );

              Object.keys(cleanBody).forEach(name => {
                const param = multipartParams.find(multipartParam => multipartParam.name === name);

                const value = formatter(formData, param, 'body', true);

                // If we're dealing with a binary type, and the value is a valid data URL we should parse out any
                // available filename and content type to send along with the parameter to interpreters like `fetch-har`
                // can make sense of it and send a usable payload.
                const addtlData = {};

                if (binaryTypes.includes(name)) {
                  const parsed = parseDataUrl(value);
                  if (parsed) {
                    addtlData.fileName = 'name' in parsed ? parsed.name : 'unknown';
                    if ('contentType' in parsed) {
                      addtlData.contentType = parsed.contentType;
                    }
                  }
                }

                appendHarValue(har.postData.params, name, value, addtlData);
              });
            }
          } else {
            har.postData.mimeType = contentType;

            // Handle arbitrary JSON input via a string.
            // In OAS you usually find this in an application/json content type.
            //   with a schema type=string, format=json.
            // In the UI this is represented by an arbitrary text input
            // This ensures we remove any newlines or tabs and use a clean json block in the example
            if (requestBody.schema.type === 'string') {
              har.postData.text = JSON.stringify(JSON.parse(cleanBody));
            } else {
              // Handle formatted JSON objects that have properties that accept arbitrary JSON
              // Find all `{ type: string, format: json }` properties in the schema because we need to manually JSON.parse
              // them before submit, otherwise they'll be escaped instead of actual objects.
              // We also only want values that the user has entered, so we drop any undefined cleanBody keys
              const jsonTypes = Object.keys(requestBody.schema.properties).filter(
                key => requestBody.schema.properties[key].format === 'json' && cleanBody[key] !== undefined
              );

              if (jsonTypes.length) {
                try {
                  jsonTypes.forEach(prop => {
                    try {
                      cleanBody[prop] = JSON.parse(cleanBody[prop]);
                    } catch (e) {
                      // leave the prop as a string value
                    }
                  });

                  // `RAW_BODY` is a ReadMe-specific thing where we'll interpret its contents as raw JSON.
                  if (typeof cleanBody.RAW_BODY !== 'undefined') {
                    cleanBody = cleanBody.RAW_BODY;
                  }

                  har.postData.text = JSON.stringify(cleanBody);
                } catch (e) {
                  har.postData.text = stringify(formData.body);
                }
              } else {
                har.postData.text = stringify(formData.body);
              }
            }
          }
        } catch (e) {
          // you should log this error if you're debugging why data is showing up in text, when it  should show up in params
          // console.log('catching ', e);
          // If anything above fails for whatever reason, assume that whatever we had is invalid JSON and just treat it
          // as raw text.
          har.postData.text = stringify(formData.body);
        }
      } else {
        har.postData.mimeType = contentType;
        if (isPrimitive(formData.body)) {
          har.postData.text = formData.body;
        } else {
          har.postData.text = stringify(formData.body);
        }
      }
    }
  }

  // Add a `Content-Type` header if there are any body values setup above or if there is a schema defined, but only do
  // so if we don't already have a `Content-Type` present as it's impossible for a request to have multiple.
  if ((har.postData.text || Object.keys(requestBody.schema).length) && !hasContentType) {
    har.headers.push({
      name: 'Content-Type',
      value: contentType,
    });
  }

  const securityRequirements = operation.getSecurity();

  if (securityRequirements && securityRequirements.length) {
    // TODO pass these values through the formatter?
    securityRequirements.forEach(schemes => {
      Object.keys(schemes).forEach(security => {
        const securityValue = configureSecurity(apiDefinition, auth, security);
        if (!securityValue) {
          return;
        }

        har[securityValue.type].push(securityValue.value);
      });
    });
  }

  // If we didn't end up filling the `postData` object then we don't need it.
  if (Object.keys(har.postData).length === 0) {
    delete har.postData;
  }

  return { log: { entries: [{ request: har }] } };
};
