var Detector = require('../../lib/detector.js')
/**
 * Function to detect the type of a give code-line in the source file
 * (preferably the line *after* a comment)
 * @param string
 * @param i
 * @api public
 */
module.exports = new Detector([
  // Use Jon Schlinkert's module to detect the code context
  require('parse-code-context'),
  // Function-properties of an object (like "name: function(param1,param)")
  Detector.parser(/[ \t]*["']?([\w$]+)["']?[ \t]*:[ \t]*function([\w\W]+)?/, function (match, name, args) {
    return {
      type: 'function expression',
      name: name,
      // Split params by non-word characters and take only the defined ones.
      params: args.split(/\W/g).filter(Boolean),
      string: name + '()',
      original: match
    }
  })
])
