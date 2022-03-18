const fetch = require('node-fetch');
const fs = require('fs');
const converter = require('swagger2openapi');
const openapiParser = require('@readme/openapi-parser');
const utils = require('./lib/utils');

class oasNormalize {
  constructor(file, opts) {
    this.file = file;
    this.opts = {
      colorizeErrors: false,
      enablePaths: false,
      ...opts,
    };

    this.type = utils.type(this.file);

    this.cache = {
      load: false,
      bundle: false,
      deref: false,
    };
  }

  // Internal API for the most part
  async load() {
    if (this.cache.load) return Promise.resolve(this.cache.load);

    const resolve = obj => {
      const ret = utils.stringToJSON(obj);
      this.cache.load = ret;
      return Promise.resolve(ret);
    };

    if (this.type === 'json' || this.type === 'string-json' || this.type === 'string-yaml') {
      return resolve(this.file);
    } else if (this.type === 'buffer') {
      return resolve(this.file.toString());
    } else if (this.type === 'url') {
      const resp = await fetch(this.file).then(res => res.text());
      return resolve(resp);
    } else if (this.type === 'path') {
      // Load a local file
      if (!this.opts.enablePaths) {
        return Promise.reject(new Error('Use `opts.enablePaths` to enable accessing local files.'));
      }

      const contents = fs.readFileSync(this.file).toString();
      return resolve(contents);
    }

    return Promise.reject(new Error('Could not load this file.'));
  }

  async bundle() {
    if (this.cache.bundle) return Promise.resolve(this.cache.bundle);

    return this.load()
      .then(schema => openapiParser.bundle(schema))
      .then(bundle => {
        this.cache.bundle = bundle;
        return bundle;
      });
  }

  async deref() {
    if (this.cache.deref) return Promise.resolve(this.cache.deref);

    return this.load()
      .then(schema => openapiParser.dereference(schema))
      .then(dereferenced => {
        this.cache.deref = dereferenced;
        return dereferenced;
      });
  }

  async validate(convertToLatest = false) {
    const colorizeErrors = this.opts.colorizeErrors;

    return this.load().then(async schema => {
      const baseVersion = parseInt(utils.version(schema), 10);

      if (baseVersion === 1) {
        return Promise.reject(new Error('Swagger v1.2 is unsupported.'));
      } else if (baseVersion === 2 || baseVersion === 3) {
        // `openapiParser.validate()` dereferences schemas at the same time as validation and does
        // not give us an option to disable this. Since all we already have a dereferencing method
        // on this library and our `validate()` method here just needs to tell us if the definition
        // is valid or not we need to clone it before passing it over to `openapi-parser` so as to
        // not run into pass-by-reference problems.
        const clonedSchema = JSON.parse(JSON.stringify(schema));

        return openapiParser
          .validate(clonedSchema, {
            validate: {
              colorizeErrors,
            },
          })
          .then(() => {
            if (!convertToLatest) {
              return schema;
            }

            return converter.convertObj(schema, { anchors: true }).then(options => {
              return options.openapi;
            });
          })
          .catch(err => Promise.reject(err));
      }

      return Promise.reject(new Error('The supplied API definition is unsupported.'));
    });
  }

  version() {
    return this.load().then(schema => utils.version(schema));
  }
}

module.exports = oasNormalize;
