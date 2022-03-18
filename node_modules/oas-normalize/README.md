OpenAPI 3.x or Swagger 2.0? YAML or JSON? URL, path, string or object? Who cares! It just works.

This module uses a bunch of other great modules to do the heavy lifting, and normalizes everything!

[![Build](https://github.com/readmeio/oas-normalize/workflows/CI/badge.svg)](https://github.com/readmeio/oas-normalize/) [![](https://img.shields.io/npm/v/oas-normalize)](https://npm.im/oas-normalize)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.com)

# Install

```bash
npm install oas-normalize --save
```

# Usage

It's pretty simple:

```javascript
const OASNormalize = require('oas-normalize');

const oas = new OASNormalize(
  // Or a string, pathname, JSON blob, whatever
  'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml'
);

oas.validate().then(definition => {
  // Definition will always be JSON, and valid.
  console.log(definition);
}).catch(err => {
  console.log(err);
});
```

# Errors

For validation errors, when available, you'll get back an object:

```json
{
  "details": [
    // Ajv pathing errors. For example:
    /* {
      "instancePath": "/components/securitySchemes/tlsAuth",
      "schemaPath": "#/properties/securitySchemes/patternProperties/%5E%5Ba-zA-Z0-9%5C.%5C-_%5D%2B%24/oneOf",
      "keyword": "oneOf",
      "params": { "passingSchemas": null },
      "message": "must match exactly one schema in oneOf"
    }, */
  ]
}
```

`message` is almost always there, but `path` is less dependable.

# Helper Functions

> **Note:** All of these functions are promise-driven.

If you want some more functionality, you can do anything here:

| Function | What it does |
| :--- | :--- |
| `.load()` | Just load the file, valid or not, as JSON |
| `.bundle()` | Bring together all files into one JSON blob (but retain `$ref` pointers) |
| `.deref()` | Resolve `$ref` pointers |
| `.validate([convertToLatest?])` | Validate the whole thing! |

# Other Little Features

### Always Return OpenAPI 3.x

If you want `.validate` to always return an OpenAPI 3.x definition, supply `true` as its argument:

```js
OASNormalize.validate(true).then(...);
```

### Enable Local Paths

For security reasons, you need to opt into allowing fetching by a local path. To enable it supply the `enablePaths` option to the class instance:

```js
const oas = new OASNormalize('./petstore.json', { enablePaths: true })
```

### Colorized errors

If you wish errors from `.validate()` to be styled and colorized, supply `colorizeErrors: true` to your instance of `OASNormalize`:

```js
const oas = new OASNormalize('https://example.com/petstore.json', {
  colorizeErrors: true,
})
```

Error messages will look like such:

<img src="https://user-images.githubusercontent.com/33762/137796648-7e1157c2-cee4-466e-9129-dd2a743dd163.png" width="600" />
