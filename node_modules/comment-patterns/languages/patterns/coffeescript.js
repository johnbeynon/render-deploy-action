module.exports = {
  name: 'CoffeeScript',
  nameMatchers: ['.coffee', 'Cakefile'],
  multiLineComment: [{
    start: '###*',
    middle: / \*|#/,
    end: '###'
  }, {
    start: '###',
    middle: '#',
    end: '###'
  }],
  singleLineComment: ['#']
}
