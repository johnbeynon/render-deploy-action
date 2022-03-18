module.exports = {
  name: 'Swift',
  nameMatchers: ['.swift'],
  multiLineComment: [{
    start: /\/\*\*?/,
    middle: '*',
    end: '*/'
  }],
  singleLineComment: ['//']
}
