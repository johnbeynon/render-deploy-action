/* eslint-disable no-case-declarations */
const parseDataUrl = require('parse-data-url');

function constructRequest(har, userAgent = false) {
  if (!har) throw new Error('Missing HAR definition');
  if (!har.log || !har.log.entries || !har.log.entries.length) throw new Error('Missing log.entries array');

  const { request } = har.log.entries[0];
  const { url } = request;
  let querystring = '';

  const headers = new Headers();
  const options = {
    method: request.method,
  };

  if ('headers' in request && request.headers.length) {
    // eslint-disable-next-line consistent-return
    request.headers.forEach(header => {
      try {
        return headers.append(header.name, header.value);
      } catch (err) {
        // `Headers.append()` will throw errors if the header name is not a legal HTTP header name, like
        // `X-API-KEY (Header)`. If that happens instead of tossing the error back out, we should silently just ignore
        // it.
      }
    });
  }

  if ('cookies' in request && request.cookies.length) {
    // As the browser fetch API can't set custom cookies for requests, they instead need to be defined on the document
    // and passed into the request via `credentials: include`. Since this is a browser-specific quirk, that should only
    // happen in browsers!
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      request.cookies.forEach(cookie => {
        document.cookie = `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`;
      });

      options.credentials = 'include';
    } else {
      headers.append(
        'cookie',
        request.cookies
          .map(cookie => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
          .join('; ')
      );
    }
  }

  if ('postData' in request) {
    if ('params' in request.postData) {
      if (!('mimeType' in request.postData)) {
        request.postData.mimeType = 'application/octet-stream';
      }

      switch (request.postData.mimeType) {
        case 'application/x-www-form-urlencoded':
          // Since the content we're handling here is to be encoded as `application/x-www-form-urlencoded`, this should
          // override any other Content-Type headers that are present in the HAR. This is how Postman handles this case
          // when building code snippets!
          //
          // https://github.com/github/fetch/issues/263#issuecomment-209530977
          headers.set('Content-Type', request.postData.mimeType);

          const encodedParams = new URLSearchParams();
          request.postData.params.forEach(param => encodedParams.set(param.name, param.value));

          options.body = encodedParams.toString();
          break;

        case 'multipart/form-data':
          // If there's a Content-Type header set remove it. We're doing this because when we pass the form data object
          // into `fetch` that'll set a proper `Content-Type` header for this request that also includes the boundary
          // used on the content.
          //
          // If we don't do this, then consumers won't be able to parse out the payload because they won't know what
          // the boundary to split on it.
          if (headers.has('Content-Type')) {
            headers.delete('Content-Type');
          }

          // The `form-data` NPM module returns one of two things: a native `FormData` API, or its own polyfill. Since
          // the polyfill does not support the full API of the native FormData object, when you load `form-data` within
          // a browser environment you'll have two major differences in API:
          //
          //  * The `.append()` API in `form-data` requires that the third argument is an object containing various,
          //    undocumented, options. In the browser, `.append()`'s third argument should only be present when the
          //    second is a `Blob` or `USVString`, and when it is present, it should be a filename string.
          //  * `form-data` does not expose an `.entries()` API, so the only way to retrieve data out of it for
          //    construction of boundary-separated payload content is to use its `.pipe()` API. Since the browser
          //    doesn't have this API, you'll be unable to retrieve data out of it.
          //
          // Now since the native `FormData` API is iterable, and has the `.entries()` iterator, we can easily detect
          // what version of the FormData API we have access to by looking for this and constructing a simple wrapper
          // to disconnect some of this logic so you can work against a single, consistent API.
          //
          // Having to do this isn't fun, but it's the only way you can write code to work with `multipart/form-data`
          // content under a server and browser.
          const form = new FormData();
          const isNativeFormData = typeof form[Symbol.iterator] === 'function';

          request.postData.params.forEach(param => {
            if ('fileName' in param && !('value' in param)) {
              throw new Error(
                "The supplied HAR has a postData parameter with `fileName`, but no `value` content. Since this library doesn't have access to the filesystem, it can't fetch that file."
              );
            }

            // If the incoming parameter is a file, and that files value is a data URL, we should decode that and set
            // the contents of the value in the HAR to the actual contents of the file.
            if ('fileName' in param) {
              const parsed = parseDataUrl(param.value);
              if (parsed) {
                // eslint-disable-next-line no-param-reassign
                param.value = parsed.toBuffer().toString();
              }
            }

            if (isNativeFormData) {
              if ('fileName' in param) {
                const paramBlob = new Blob([param.value], { type: param.contentType || null });
                form.append(param.name, paramBlob, param.fileName);
              } else {
                form.append(param.name, param.value);
              }
            } else {
              form.append(param.name, param.value || '', {
                filename: param.fileName || null,
                contentType: param.contentType || null,
              });
            }
          });

          options.body = form;
          break;

        default:
          const formBody = {};
          request.postData.params.map(param => {
            try {
              formBody[param.name] = JSON.parse(param.value);
            } catch (e) {
              formBody[param.name] = param.value;
            }

            return true;
          });

          options.body = JSON.stringify(formBody);
      }
    } else {
      options.body = request.postData.text;
    }
  }

  if ('queryString' in request && request.queryString.length) {
    const query = request.queryString.map(q => `${q.name}=${q.value}`).join('&');
    querystring = `?${query}`;
  }

  if (userAgent) {
    headers.append('User-Agent', userAgent);
  }

  options.headers = headers;

  return new Request(`${url}${querystring}`, options);
}

function fetchHar(har, userAgent) {
  return fetch(constructRequest(har, userAgent));
}

module.exports = fetchHar;
module.exports.constructRequest = constructRequest;
