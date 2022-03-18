module.exports = {
  name: 'TypeScript',
  nameMatchers: ['.ts'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
