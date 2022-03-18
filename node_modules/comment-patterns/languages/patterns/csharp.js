module.exports = {
  name: 'CSharp',
  nameMatchers: ['.cs'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
