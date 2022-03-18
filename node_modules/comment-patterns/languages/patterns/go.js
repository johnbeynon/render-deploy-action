module.exports = {
  name: 'Go',
  nameMatchers: ['.go'],
  singleLineComment: require('./common/c-style.js').singleLine(),
  multiLineComment: require('./common/c-style.js').multiLine()
}
