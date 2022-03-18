module.exports = {
  name: 'Ruby',
  nameMatchers: ['.rb', '.ru', '.gemspec'],
  singleLineComment: ['#'],
  multiLineComment: [{
    start: '=begin',
    middle: '',
    end: '=end'
  }]
}
