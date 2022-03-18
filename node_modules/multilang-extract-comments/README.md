# multilang-extract-comments [![NPM version](https://badge.fury.io/js/multilang-extract-comments.svg)](http://badge.fury.io/js/multilang-extract-comments)  [![Build Status](https://travis-ci.org/nknapp/multilang-extract-comments.svg)](https://travis-ci.org/nknapp/multilang-extract-comments)  [![Coverage Status](https://img.shields.io/coveralls/nknapp/multilang-extract-comments.svg)](https://coveralls.io/r/nknapp/multilang-extract-comments)

> Extract comments from source files of various languages

## Overview

multilang-extract-comments is a package for extracting comments from source-code. It is compatible with the
`extract-comments`-package by Jon Schlinkert:

It provides an extended API, which allows you to extract comments not only from JavaScript
files, but also from Python, C, Handlebars etc.

The module was originally forked from [extract-comments](https://github.com/jonschlinkert/extract-comments),
with the purpose to allow [verb](https://github.com/verbose/verb) to extract jsdoc-like comments from file
other than JavaScript-files. In the end, the module was a complete rewrite of the original module. Now the only
common file is `spec/javascript-spec.js` which is more or less equal to Jon Schlinkert's
`extract-comments/test.js`.

The primary targets are Handlebars-files, for documenting
[bootprint template-modules](https://github.com/nknapp/bootprint).

## Example (JavaScript)

For the following string:

```js
/**
 * A javascript multiline-comment
 * with multiple lines
 */
function aLineOfCode () {
}

// A single line comments
// More of it directly below
function anotherFunction () {
  aLineOfCode()
}

anotherFunction()
```

and the following code

```js
var comments = require('multilang-extract-comments')(string);
```

The variable `comments` now contains:

```json
{
  "1": {
    "begin": 1,
    "end": 4,
    "codeStart": 5,
    "content": "A javascript multiline-comment\nwith multiple lines\n",
    "info": {
      "type": "multiline",
      "apidoc": true
    },
    "code": "function aLineOfCode () {"
  },
  "8": {
    "begin": 8,
    "end": 9,
    "codeStart": 10,
    "content": "A single line comments\nMore of it directly below\n",
    "info": {
      "type": "singleline"
    },
    "code": "function anotherFunction () {"
  }
}
```

Also have a look at the usage example of `extract-comments`

## Example (Handlebars)

For the following string:

```hbs
Some code here
```

and the following code

```hbs
var comments = require('multilang-extract-comments')(string, { filename: 'handlebars.hbs'});
```

The variable `comments` now contains:

```json
{
  "1": {
    "begin": 1,
    "end": 4,
    "codeStart": 5,
    "content": "This is an example\nof a handlebars multiline-comment.\n",
    "info": {
      "type": "multiline"
    },
    "code": "Some code here"
  }
}
```

## Example (Custom)

For the following string:

```ps1
<#
   A powershell multiline-comment
   with multiple lines
 #>
Function  aLineOfCode {
}

# A single line comment
# More of it directly below
Function anotherFunction () {
  Write-Output "test"
}

anotherFunction
```

and the following code

```js
var options = {
  pattern: {
    name: 'Powershell',
    nameMatchers: ['.ps1'],
    singleLineComment: [{ start: '#' }],
    multiLineComment: [{ start: '<#', middle: '', end: '#>'}]
  }
}
var comments = require('multilang-extract-comments')(string,options);
```

The variable `comments` now contains:

```json
{
  "1": {
    "begin": 1,
    "end": 4,
    "codeStart": 5,
    "content": "A powershell multiline-comment\nwith multiple lines\n ",
    "info": {
      "type": "multiline"
    },
    "code": "Function  aLineOfCode {"
  },
  "8": {
    "begin": 8,
    "end": 9,
    "codeStart": 10,
    "content": "A single line comment\nMore of it directly below\n",
    "info": {
      "type": "singleline"
    },
    "code": "Function anotherFunction () {"
  }
}
```

Also have a look at the usage example of `extract-comments`

### API

TODO

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nknapp/multilang-extract-comments/issues/new).

see [CONTRIBUTING.md](./CONTRIBUTING.md)

## Changelog

see [CHANGELOG.md](./CHANGELOG.md)

## Author

**Nils Knappmeier**

+ [github/nknapp](https://github.com/nknapp)
* [twitter/knappi79](http://twitter.com/knappi79)

## Related

* [comment-patterns](https://www.npmjs.com/package/comment-patterns): A list of comment-patterns for different languages | [homepage](https://github.com/nknapp/comment-patterns)
* [extract-comments](https://www.npmjs.com/package/extract-comments): Uses esprima to extract line and block comments from a string of JavaScript. Also optionally… [more](https://www.npmjs.com/package/extract-comments) | [homepage](https://github.com/jonschlinkert/extract-comments)

## License

Copyright © 2015-2017 Nils Knappmeier
Released under the MIT license.