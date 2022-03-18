/*!
 * multilang-extract-comments <https://github.com/nknapp/multilang-extract-comments>
 *
 * Copyright (c) 2015 Nils Knappmeier.
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

describe('extract comments from Handlebars', function () {
  var str = fs.readFileSync(require.resolve('./fixtures/body.hbs'))
  var comments = extract(str, {
    filename: 'body.hbs'
  })

  it('a simple comment', function () {
    expect(comments['1']).toEqual({
      begin: 1,
      end: 3,
      codeStart: 4,
      content: 'A comment without indent.\n',
      code: '{{>some-partial}}',
      info: {
        type: 'multiline'
      }
    })
  })

  it('a comment with indent content. Indents should be removed such that the smallest indent is 0', function () {
    expect(comments['6']).toEqual({
      begin: 6,
      end: 10,
      codeStart: 11,
      content: 'A comment with indent ...\n\n    ... and an other larger indent\n',
      code: '{{#if definitions}}',
      info: {
        type: 'multiline'
      }
    })
  })

  it('a comment with indent content and delimiters', function () {
    expect(comments['13']).toEqual({
      begin: 13,
      end: 15,
      codeStart: 16,
      content: 'Wholly indented comment\n    ',
      code: '    {{>json-schema/definitions}}',
      info: {
        type: 'multiline'
      }
    }
    )
  })
})

describe('comment-only', function () {
  it('should not fail, if the hbs partial solely consists of a comment', function () {
    var str = fs.readFileSync(require.resolve('./fixtures/only-comments.hbs'))
    extract(str, {
      filename: 'only-comments.hbs'
    })
  })
})
