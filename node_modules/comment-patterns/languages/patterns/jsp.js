module.exports = {
  name: 'JSP',
  nameMatchers: ['.jsp'],
  multiLineComment: [{
    start: '<!--',
    middle: '',
    end: '-->'
  }, {
    start: '<%--',
    middle: '',
    end: '--%>'
  }]
}
