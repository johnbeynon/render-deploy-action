module.exports = {
  name: 'C',
  nameMatchers: ['.c', '.h'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
