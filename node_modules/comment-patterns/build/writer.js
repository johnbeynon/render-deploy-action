var esformatter = require('esformatter')
var stringify = require('json-literal').stringify
var fs = require('fs')
var path = require('path')

/**
 * Class that writes an object to a file (using the `json-literal` module)
 * @param {*} `data` the javascript object,
 * @constructor
 */
function Writer (data) {
  var prettyPrint = false

  /**
   * Enable pretty printed output
   */
  this.pretty = function () {
    prettyPrint = true
    return this
  }

  /**
   * Write the data to a file (synchronously).
   * @param {string} `targetDir` the directory of the file
   * @param {string} `filename` the name of the file
   */
  this.writeTo = function (targetDir, filename) {
    // Remove wrapping parens which are always created by json-literal
    var node = stringify(data).replace(/^\((.*)\)$/, '$1')
    // Create a valid javascript module
    var string = 'module.exports = ' + node + ';'
    // If prettyprint is enabled, use esformatter to format
    // the resulting javascript.
    if (prettyPrint) {
      string = esformatter.format(string, {
        // indent is hard coded to 4 spaces at the moment
        indent: {
          value: '    '
        }
      })
    }
    // Write the data...
    var targetFile = path.join(targetDir, filename)
    console.log('Writing ', targetFile)
    fs.writeFileSync(targetFile, string, 'utf-8')
    console.log('done')
  }
}

module.exports = Writer
