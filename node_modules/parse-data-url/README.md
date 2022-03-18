# Parse data URL string

[![Build Status](https://travis-ci.org/killmenot/parse-data-url.svg?branch=master)](https://travis-ci.org/killmenot/parse-data-url)
[![Coverage Status](https://coveralls.io/repos/github/killmenot/parse-data-url/badge.svg?branch=master)](https://coveralls.io/github/killmenot/parse-data-url?branch=master)
[![Dependency Status](https://status.david-dm.org/gh/killmenot/parse-data-url.svg)](https://david-dm.org/killmenot/parse-data-url)
[![Dev Dependency Status](https://status.david-dm.org/gh/killmenot/parse-data-url.svg?type=dev)](https://david-dm.org/killmenot/parse-data-url)
[![npm version](https://img.shields.io/npm/v/parse-data-url.svg)](https://www.npmjs.com/package/parse-data-url)
[![npm](https://img.shields.io/npm/dm/parse-data-url.svg)](https://www.npmjs.com/package/parse-data-url)
[![Known Vulnerabilities](https://snyk.io/test/github/killmenot/parse-data-url/badge.svg?targetFile=package.json)](https://snyk.io/test/github/killmenot/parse-data-url?targetFile=package.json)


## Install

```
npm install parse-data-url

```


## Example

```javascript
'use strict';

const parseDataUrl = require('parse-data-url');

// Invalid
const parsed = parseDataUrl('data:invalid');
// false

// Valid
const parsed = parseDataUrl('data:image/svg+xml;charset=UTF-8,some-data'); 

console.log(parsed);
// { mediaType: 'image/svg+xml;charset=utf-8',
//  contentType: 'image/svg+xml',
//  charset: 'utf-8',
//  base64: false,
//  data: 'some-data',
//  toBuffer: [Function] }
```


## Methods

### toBuffer()

Returns data as `Buffer`. If `parsed.base64` equals `true` `base64` is used as encoding, otherwise `utf8`.


## Contributors

[List of project's contributors!](CONTRIBUTORS.md)


## Alternatives

 - [data-urls](https://github.com/jsdom/data-urls)


## Licence

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


