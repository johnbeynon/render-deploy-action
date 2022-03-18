module.exports = {
  name: 'Scala',
  nameMatchers: ['.scala'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
