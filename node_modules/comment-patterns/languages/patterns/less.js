module.exports = {
  name: 'LESS',
  nameMatchers: ['.less'],
  singleLineComment: require('./common/c-style.js').singleLine(),
  multiLineComment: require('./common/c-style.js').multiLine()
}
