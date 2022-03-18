/*!
 * multilang-extract-comments <https://github.com/nknapp/multilang-extract-comments>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var q = require('quotemeta')
var LineCounter = require('line-counter')
var EventEmitter = require('events').EventEmitter
var util = require('util')

/**
 *
 * @param {object} pattern
 * @param {RegExp} pattern.regex
 * @param {RegExp[]} pattern.middle
 * @param {object[]} pattern.info
 * @param {object} pattern.cg
 * @param {number} pattern.cg.indent
 * @param {number} pattern.cg.wholeComment
 * @param {number} pattern.cg.contentStart
 * @constructor
 */
function Scanner (pattern) {
  var _this = this
  // Shortcut for capturing group constants
  var cg = pattern.cg

  /**
   * Return the spec that was responsible for a comment match
   * @param commentMatch
   * @returns {*}
   */
  function contentCg (commentMatch) {
    var start = cg.contentStart
    var end = start + pattern.middle.length
    for (var i = start; i < end; i++) {
      if (typeof commentMatch[i] !== 'undefined') {
        return i
      }
    }
    throw new Error('No comment-part had a match. This should not happen')
  }

  this.scan = function (contents) {
    var counter = new LineCounter(contents)
    var match
    // The first part of the string is always code (if the string starts with
    // a comment, we treat is as if the is a zero-length code-part before the comment
    // This part ends with the beginning of the first comment
    this.emit('codeStart', 0)
    while ((match = pattern.regex.exec(contents)) != null) {
      // Find the matched capturing group for the comment-alternative of the regex

      var i = contentCg(match)
      var content = match[i]
      var middle = pattern.middle[i - cg.contentStart]
      if (middle) {
        // Remove middle-prefix and a possibly following single space
        content = content.replace(middle, '').replace(/^ /gm, '')
      } else {
        var indentRegex = new RegExp('^' + q(minIndent(content)), 'mg')
        content = content.replace(indentRegex, '')
      }
      // Remove empty lines from the beginning of the comment
      content = content.replace(/^[\n\r]*/, '')

      var commentEndIndex = match.index + match[cg.indent].length + match[cg.wholeComment].length
      var codeStartIndex = match.index + match[0].length

      // Comment found, code ends here
      _this.emit('codeEnd', match.index)
      // Emit the comment details
      _this.emit('comment',
        {
          // The order of the .countUpTo-calls must be preserved or errors will occur
          begin: counter.countUpTo(match.index),
          end: counter.countUpTo(commentEndIndex - 1),
          codeStart: counter.countUpTo(Math.min(codeStartIndex, contents.length - 1)),
          content: content,
          info: pattern.info[i - cg.contentStart]
        })
      // The start of the next code part
      _this.emit('codeStart', match.index + match[0].length)
    }
    _this.emit('codeEnd', contents.length)
  }
}

/**
 * Determin the minimal indent of a multiline string.
 * e.g.
 * ```
 *    abc
 *        abd
 *            abc
 * ```
 * has the minimal indent `   ` (three spaces)
 * @param {string} `string` a multiline string
 * @returns {string} a string of spaces or tabs
 */
function minIndent (string) {
  var result = string
    // Match all leading spaces with one following non-space (multiline)
    // This results in an array where all relevant line-indents are present with
    // on additional character
    .match(/^[ \t]*\S/mg)
    // Choose from all these the indent with the minimal length
    // `min` is the string of minimal length (or `null` in the beginning).
    // `current` is the current indent-string
    .reduce(function (min, current) {
      if (min === null) {
        // Initial iteration
        return current
      }
      return min.length < current.length ? min : current
    }, null)
    // Remove the last (the non-space) character
    .slice(0, -1)

  return result
}

util.inherits(Scanner, EventEmitter)

module.exports = Scanner
