/*!
 * extract-comments <https://github.com/jonschlinkert/extract-comments>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict'

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

/* deps:mocha */
require('should')
var context = require('code-context')
var path = require('path')
var extract = require('../')
var fs = require('fs')

function read (fp) {
  return fs.readFileSync(path.join(__dirname, '/fixtures/', fp), 'utf8')
}

describe('extract comments from javascript', function () {
  it('should extract comments from a string.', function () {
    extract('/**\n * this is\n *\n * a comment\n*/\nvar foo = "bar";\n').should.eql({
      '1': {
        content: 'this is\n\na comment\n',
        begin: 1,
        end: 5,
        code: 'var foo = "bar";',
        codeStart: 6,
        info: {
          apidoc: true,
          type: 'multiline'
        }
      }
    })
  })

  it('should work with comments that have slashes.', function () {
    extract('/**\n * this /is/ a/ comment\n*/\nnext line\n').should.eql({
      '1': {
        content: 'this /is/ a/ comment\n',
        begin: 1,
        end: 3,
        code: 'next line',
        codeStart: 4,
        info: {
          apidoc: true,
          type: 'multiline'
        }
      }
    })
  })

  it('should take a callback to transform comments:', function () {
    var str = read('assemble.js')
    var comments = extract(str, function (comment) {
      comment.context = context(comment.code)
      return comment
    })

    comments['1316'].context.should.eql([
      {
        begin: 1,
        type: 'property',
        receiver: 'module',
        name: 'exports',
        value: 'Assemble',
        string: 'module.exports',
        original: 'module.exports = Assemble;'
      }
    ])
  })

  it('should add starting and ending numbers for a comment:', function () {
    var str = read('assemble.js')
    var comments = extract(str)

    comments['1274'].begin.should.equal(1274)
    comments['1274'].end.should.equal(1289)
  })

  it('should add the `codeStart`, starting line number for code following a comment:', function () {
    var str = read('assemble.js')
    var comments = extract(str)
    comments['1274'].codeStart.should.equal(1291)
  })
})
