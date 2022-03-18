module.exports = {
  name: 'Kotlin',
  nameMatchers: ['.kt', '.kts'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
