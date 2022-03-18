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

describe('extract comments from bash', function () {
  var str = fs.readFileSync(require.resolve('./fixtures/single-line-comments.bash'))
  var comments = extract(str, {
    filename: 'single-line-comments.bash'
  })

  it('first comment', function () {
    expect(comments['3']).toEqual({
      begin: 3,
      end: 5,
      codeStart: 6,
      content: 'Ein Kommentar\nmit mehreren Zeilen\nund noch eine Zeile\n',
      code: 'export VAR=x',
      info: {
        type: 'singleline'
      }
    })
  })
})
