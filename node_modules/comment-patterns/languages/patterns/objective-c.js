module.exports = {
  name: 'Objective-C',
  nameMatchers: ['.m', '.mm'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
