module.exports = {
  name: 'LiveScript',
  nameMatchers: ['.ls', 'Slakefile'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: ['#']
}
