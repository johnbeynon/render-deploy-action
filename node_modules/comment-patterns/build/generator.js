var path = require('path')
var fs = require('fs')
var Writer = require('./writer.js')
var _ = require('lodash')

/**
 * Class the can generate variations and indexes for the comment-patterns database.
 * @constructor
 */
function Generator () {
  // Read the whole database into a single array
  var languagesPath = path.resolve(__dirname, '..', 'languages', 'patterns')
  var langFiles = fs.readdirSync(languagesPath)

  /**
   * This is the database of language specifications
   * @type {Array}
   */
  var languages = langFiles
    .filter(function (langFile) {
      return path.extname(langFile) === '.js'
    })
    .map(function (langFile) {
      return _.merge(
        {
          srcFile: langFile

        },
        require(path.resolve(languagesPath, langFile))
      )
    })
    // Unique representation for single-line comment patterns
    // '#' -> { start: '#' }
    .map(function (langFile) {
      if (langFile.singleLineComment) {
        langFile.singleLineComment = langFile.singleLineComment.map(function (slc) {
          if (_.isString(slc)) {
            return { start: slc }
          } else {
            return slc
          }
        })
      }
      return langFile
    })

  /**
   * Create an index for fast access to the database
   * @param {function} `fn` a function to compute the key for each specification.
   *    If the result is an array, the entry will be indexed by every element of the result
   */
  this.createIndex = function (fn) {
    var result = {}
    languages.forEach(function (langSpec, i) {
      var keys = fn.call(this, langSpec)
      if (_.isArray(keys)) {
        keys.forEach(function (key) {
          result[key] = i
        })
      } else {
        // keys only consists of a single key
        result[keys] = i
      }
    })
    return new Writer(result)
  }

  /**
   * Transform each element of
   * @param fn
   */
  this.transform = function (fn) {
    return new Writer(languages.map(fn))
  }

  /**
   * Write the un-transformerd library to a file
   * @param {string} `targetDir` the directory of the file
   * @param {string} `filename` the name of the file
   */
  this.writeTo = function (targetDir, filename) {
    this.transform(_.identity).writeTo(targetDir, filename)
  }
}

module.exports = Generator
