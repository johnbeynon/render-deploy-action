/**
 * Returns the pattern for c-style multiline-comments
 * (for JS, C, C++ etc.)
 */
module.exports.multiLine = function () {
  return [{
    start: /\/\*\*/,
    middle: '*',
    end: '*/',
    apidoc: true
  }, {
    start: /\/\*/,
    middle: '*',
    end: '*/'
  }]
}

/**
 * Returns the pattern for c-style singleline-comments
 * @returns {string[]}
 */
module.exports.singleLine = function () {
  return ['//']
}
