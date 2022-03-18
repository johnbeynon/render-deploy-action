var path = require('path')
var _ = require('lodash')
var byMatcher = require('./db-generated/by-matcher.js')

/**
 * Determine the index of a language specifiation in the languages-array.
 * @param filename
 * @returns {*}
 */
var langIndex = function (filename) {
  // Look for whole filename and for extension ("Makefile" is not an extesion,
  // but should be matched to the appropriate language)
  var index = byMatcher[filename]
  if (_.isUndefined(index)) {
    index = byMatcher[path.extname(filename)]
  }
  if (_.isUndefined(index)) {
    throw new Error("Cannot find language definition for '" + filename + "'")
  }
  return index
}
/**
 * Load the comment-pattern for a given file.
 * The file-language is determined by the file-extension.
 * @param {string} `filename` the name of the file
 * @returns {object} the comment-patterns
 * @api public
 */
function commentPattern (filename) {
  var base = require('./db-generated/base.js')
  var clone = _.cloneDeep(base[langIndex(filename)])
  delete clone.srcFile
  return clone
}

/**
 * Load the comment-regex for a given file.
 * The result contains a regex that matches the comments
 * in the specification. It also has information about
 * which the different capturing groups of an object.
 *
 * @param {string} `filename` the name of the file
 * @returns {object} an object containing regular expressions and capturing-group metadata,
 *      see usage example for details
 * @api public
 * @name commentPattern.regex
 */
commentPattern.regex = function commentRegex (filename) {
  var regex = require('./db-generated/regexes.js')
  return _.cloneDeep(regex[langIndex(filename)])
}

/**
 * Returns the code-context detector for a given filename
 * (based on the name or the file-extension
 * @param {string} filename the name of the file that will be evaluated.
 * @return {function(string,number)} a function that detects the code-context
 *   based on a line of code (and a line-number)
 */
commentPattern.codeContext = function codeContext (filename) {
  var base = require('./db-generated/base.js')
  var langFile = base[langIndex(filename)].srcFile
  return require('./languages/code-context/' + langFile)
}

module.exports = commentPattern
