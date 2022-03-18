const YAML = require('js-yaml');

module.exports = {
  // YAML or JSON string to JSON Object
  stringToJSON: string => {
    if (typeof string === 'object') {
      return string;
    } else if (string.match(/^\s*{/)) {
      return JSON.parse(string);
    }

    return YAML.load(string);
  },

  type: obj => {
    if (module.exports.isBuffer(obj)) {
      return 'buffer';
    } else if (typeof obj === 'object') {
      return 'json';
    } else if (typeof obj === 'string') {
      if (obj.match(/\s*{/)) {
        return 'string-json';
      }
      if (obj.match(/\n/)) {
        // Not sure about this...
        return 'string-yaml';
      }
      if (obj.substr(0, 4) === 'http') {
        return 'url';
      }
      return 'path';
    }

    return false;
  },

  version: schema => schema.swagger || schema.openapi,

  isBuffer: obj =>
    obj != null &&
    obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj),
};
