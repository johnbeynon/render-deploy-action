#!/usr/bin/env node

var _ = require('lodash')
var groc = require('groc')

var fs = require('fs')
var path = require('path')
var Writer = require('./writer')

var databaseDir = path.resolve(__dirname, '..', 'languages', 'patterns')
/**
 * At first, we create a simple array of specs (from the `groc`-languages file).
 * The array can be transformed later to improved performance.
 * @type {Array}
 */
var baseSpec = _.chain(groc.LANGUAGES)
  .map(function (spec, key) {
    var result = {
      name: key,
      nameMatchers: spec.nameMatchers,
      commentsOnly: spec.commentsOnly,
      multiLineComment: convertMultilineComments(spec.multiLineComment),
      singleLineComment: spec.singleLineComment
    }
    Object.keys(result).forEach(function (resultKey) {
      if (_.isUndefined(result[resultKey])) {
        delete result[resultKey]
      }
    })
    return result
  })
  .sortBy(_.property('name'))
  .value()

/**
 * Convert 3-tuples for multi-line-comments from groc-format into a
 * more readble object representation
 */
function convertMultilineComments (multiLineComment) {
  if (_.isUndefined(multiLineComment)) {
    return undefined
  }
  var newMultiLineComment = []
  for (var i = 0; i < multiLineComment.length; i += 3) {
    newMultiLineComment.push({
      start: multiLineComment[i],
      middle: multiLineComment[i + 1],
      end: multiLineComment[i + 2]
    })
  }
  return newMultiLineComment
}

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir)
}

// Copy the license file
var grocLicense = require.resolve('groc/MIT-LICENSE.txt')
var grocLicenseTarget = path.join(databaseDir, '_LICENSE.txt')
fs.createReadStream(grocLicense)
  .pipe(fs.createWriteStream(grocLicenseTarget))

baseSpec.forEach(function (lang) {
  var targetFile = lang.name.replace(/\+/g, 'plus').toLowerCase() + '.js'
  new Writer(lang).pretty().writeTo(databaseDir, targetFile)
})

// Create optimized versions
