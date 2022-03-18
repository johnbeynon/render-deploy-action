module.exports = {
  name: 'SCSS',
  nameMatchers: ['.scss'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
