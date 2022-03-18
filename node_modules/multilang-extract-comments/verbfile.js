/*!
 * multilang-extract-comments <https://github.com/nknapp/multilang-extract-comments>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */
var verb = require('verb')

verb.helper('extract', require('./'))

verb.helper('extractHbs', function (string) {
  return require('./')(string, {
    filename: 'filename.hbs'
  })
})

verb.helper('extractCustom', function (string) {
  return require('./')(string, {
    pattern: {
      name: 'Powershell',
      nameMatchers: ['.ps1'],
      singleLineComment: [{ start: '#' }],
      multiLineComment: [{ start: '<#', middle: '', end: '#>' }]
    }
  })
})

verb.helper('stringifyPretty', function (obj) {
  return JSON.stringify(obj, undefined, 2)
})

verb.task('default', function () {
  verb.src(['.verb.md'])
    .pipe(verb.dest('./'))
})
