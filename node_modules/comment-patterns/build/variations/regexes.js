var _ = require('lodash')

/**
 * Transforms a language-pattern into an object containing regexes to detect comments in this language
 * and remove the surrounding boilerplate (i.e. `//`,`{{!`, `}}` etc.)
 * @param pattern an entry from the language specification (see `languages`-directory)
 * @returns {object} an object containing regexes.
 */
module.exports = function (pattern) {
  // Parts of the regex that match multiline comments
  var multiLineComment = pattern.multiLineComment || []
  var middle = []
  var info = []
  var boundaries = []
  multiLineComment.forEach(function (mlc) {
    // use [\s\S]* to match everything (including newlines)
    boundaries.push(q(mlc.start) + '([\\s\\S]*?)' + q(mlc.end))

    info.push(_.merge(
      {
        type: 'multiline'
      },
      _.omit(mlc, 'middle', 'start', 'end')
    ))

    // Middle-regex only applies if a prefix exists.
    // Otherwise the regex would remove indents
    if (mlc.middle !== '') {
      middle.push(new RegExp('^[ \\t]*' + q(mlc.middle), 'mg'))
    } else {
      // Push `null`, so that the array-index of following middle-regexes
      // is matching appropriate capture group of the main-regexs
      middle.push(null)
    }
  })

  // The same for single-line-comments
  var singleLineComment = pattern.singleLineComment || []
  singleLineComment.forEach(function (slc) {
    // Single-line-patterns are taken up to the next newline,
    // but we treat multiple consecutive occurences of the pattern as a single
    // multiline-comment.
    // The start of the expression (`[ \\t]*?`) allows the regex to match the
    // indent of the second single-line-comment.
    // The end `\\r?\\n?` optionally matches different newline variations
    // (`\r`, `\n` or `\r\n`). Its shorter than `/(\r|\n|\r\n)?\/`
    boundaries.push('((?:[ \\t]*?' + q(slc.start) + '.*\\r?\\n?)+)')

    // Match the part up to the the comment delimiter
    middle.push(new RegExp('^[ \\t]*' + q(slc.start), 'mg'))

    info.push(_.merge(
      {
        type: 'singleline'
      },
      _.omit(slc, 'start')
    ))
  })

  var regex = new RegExp(
    // Comment must start at the line`s begining (possibly indented)
    '^([ \\t]*)' +
    // This part matches the contents
    '(' + boundaries.join('|') + ')' +
    // Match trailing new-lines to determine start the start of the next code-line.
    '[\\r\\n]*'
    , 'mg'
  )

  var cg = {
    // indent before the comment start
    indent: 1,
    // the whole comment (including start-end pattern)
    wholeComment: 2,
    // capture groups for the contents of the comment contents begin with this index (boundaries)
    contentStart: 3
  }

  return {
    regex: regex,
    cg: cg,
    middle: middle,
    // include the name to make the database more readable.
    name: pattern.name,
    info: info
  }
}

// Escape a regex or a string for use as part of another regex.
function q (regexOrString) {
  return typeof regexOrString === 'string'
    ? _.escapeRegExp(regexOrString)
    : regexOrString.source
}
