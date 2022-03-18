/*!
 * multilang-extract-comments <https://github.com/nknapp/multilang-extract-comments>
 *
 * Copyright (c) 2015-2017 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var cp = require('comment-patterns')
var Scanner = require('./scanner.js')
var nextLineRegex = /.*$/mg

function identityFunction (x) {
  return x
}

function extract (str, fn, options) {
  if (typeof fn !== 'function' && typeof options === 'undefined') {
    options = fn
    fn = identityFunction
  }
  // default filename is a javascript file (for backwards compatibility)
  var filename = (options && options.filename) || 'abc.js'
  var regexp = {}

  // check for custom comment pattern
  if (options && options.pattern) {
    regexp = require('comment-patterns/build/variations/regexes')(options.pattern)
  } else {
    regexp = cp.regex(filename)
  }

  var result = {}

  // This variable is an intermediate
  // store for comments that have been extracted,
  // but the next-line-of-code is still missing
  // This property is not set until the following
  // comment is processed.
  var lastComment = null
  var codeStart = null
  var codeEnd = null
  new Scanner(regexp)
    .on('comment', function (comment) {
      // Temporary save the comment
      lastComment = comment
    })
    .on('codeStart', function (codeStartIndex) {
      // Save the index of the first line of code after the comment
      codeStart = codeStartIndex
    })
    .on('codeEnd', function (codeEndIndex) {
      codeEnd = codeEndIndex
      if (lastComment) {
        // Finalize the last comment: Retrieve the first line of code.
        // At most up to the next comment
        nextLineRegex.lastIndex = codeStart
        var match = nextLineRegex.exec(str)
        if (match[0].length > codeEnd - codeStart) {
          lastComment.code = match[0].substr(codeEnd - codeStart)
        } else {
          lastComment.code = match[0]
        }
        result[lastComment.begin] = fn(lastComment, lastComment.begin, lastComment.end)
      }
    })
    .scan(str)

  return result
}

module.exports = extract
