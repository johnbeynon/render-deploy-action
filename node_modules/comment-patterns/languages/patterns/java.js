module.exports = {
  name: 'Java',
  nameMatchers: ['.java'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
