/*!
 * multilang-code-context <https://github.com/nknapp/multilang-code-context>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */
var _ = require('lodash')

/**
 * Create a new detector. A detector contains a list of parsers which extract the
 * code context from a list of nodes.
 * It is an immutable object that can be `extend`ed, creating a new instance with more parsers.
 * @param {function(string)} parsers
 * @constructor
 * @api public
 */
function Detector (parsers) {
  /**
   * Creates an extended Detector with additional parsers. A new instance will be created.
   * The old `Detector` remains untouched.
   * @param {function(string)} moreParsers more parsers.
   *  Those are inserted at the beginning of the list, so they override existing parsers.
   * @returns {Detector} a new Detector instance
   * @api public
   */
  this.extend = function (moreParsers) {
    return new Detector(moreParsers.concat(parsers))
  }

  /**
   * Perform detection. This method calls the included parsers one after another
   * and returns the first-non-null result. The line-number is returned
   * as `begin`-property in the result, but the parser-function can override it.
   * @param {string} string the line-of-code
   * @param {number} lineNr the line-number
   * @returns {object}
   * @api public
   */
  this.detect = function (string, lineNr) {
    // Execute all parsers on after each other.
    // Return the first non-null result.
    for (var i = 0; i < parsers.length; i++) {
      var result = parsers[i](string, lineNr)
      if (result) {
        return _.merge({ begin: lineNr }, result)
      }
    }
    return {}
  }
}

/**
 * Helper function to create a parser from a `regex` that matches a string
 * and a `resolver` that parses the
 * @param {RegExp} regex a regular expression that is matched against a code-line.
 * @param {function(...string)} resolver a function that resolves the regex match into
 *   a code-context object. The function-parameters are the capturing groups of the regex
 * @return {function} a function that can be used as parser
 * @api public
 */
Detector.parser = function (regex, resolver) {
  return function (string, lineNr) {
    var result = string.match(regex)
    if (result) {
      return _.merge({ begin: lineNr }, resolver.apply(this, result)
      )
    }
    return null
  }
}

module.exports = Detector
