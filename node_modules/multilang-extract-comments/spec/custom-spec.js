/*!
 * multilang-extract-comments <https://github.com/nknapp/multilang-extract-comments>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */
/* global expect */

'use strict'

var extract = require('../')
var fs = require('fs')

describe('extract comments from file with custom comment pattern', function () {
  var options = {
    pattern: {
      filename: 'body.ps1',
      name: 'Powershell',
      nameMatchers: ['.ps1'],
      singleLineComment: [{ start: '#' }],
      multiLineComment: [{ start: '<#', middle: '', end: '#>' }]
    }
  }
  var str = fs.readFileSync(require.resolve('./fixtures/body.ps1'))
  var comments = extract(str, options)

  it('a simple comment', function () {
    expect(comments['1']).toEqual({
      begin: 1,
      end: 1,
      codeStart: 3,
      content: 'simple one line\n',
      code: '<#',
      info: {
        type: 'singleline'
      }
    })
  })

  it('Multiline comment', function () {
    expect(comments['3']).toEqual({
      begin: 3,
      end: 6,
      codeStart: 7,
      content: 'A powershell multiline-comment\nwith multiple lines\n ',
      code: 'Function  aLineOfCode {',
      info: {
        type: 'multiline'
      }
    })
  })

  it('Multiple Single line comments', function () {
    expect(comments['10']).toEqual({
      begin: 10,
      end: 11,
      codeStart: 12,
      content: 'A single line comment\nMore of it directly below\n',
      code: 'Function anotherFunction () {',
      info: {
        type: 'singleline'
      }
    }
    )
  })
})
