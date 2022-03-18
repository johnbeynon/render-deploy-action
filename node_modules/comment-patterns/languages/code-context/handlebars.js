var Detector = require('../../lib/detector.js')

/**
 * A handlebars partial is considered to be a function expression
 * It is expected to contain a single comment describing its
 * parameters and contents.
 * @api public
 */
module.exports = new Detector([
  Detector.parser(/.*/, function () {
    return {
      type: 'function expression'
    }
  })
])
