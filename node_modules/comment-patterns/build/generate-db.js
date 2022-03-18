var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var Generator = require('./generator.js')

// Generate base directory
var databaseDir = path.resolve(__dirname, '..', 'db-generated')
if (!fs.existsSync(databaseDir)) {
  try {
    fs.mkdir(databaseDir)
  } catch (Error) {
    fs.mkdirSync(databaseDir)
  }
}

var generator = new Generator()

// Generate indexes
generator.createIndex(_.property('name')).writeTo(databaseDir, 'by-name.js')
generator.createIndex(_.property('nameMatchers')).writeTo(databaseDir, 'by-matcher.js')

// Generate (transformed) databases
generator.writeTo(databaseDir, 'base.js')

// For regexes...
var regexTransform = require('./variations/regexes.js')
generator.transform(regexTransform).writeTo(databaseDir, 'regexes.js')
