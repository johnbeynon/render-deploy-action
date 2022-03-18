module.exports = {
  name: 'C++',
  nameMatchers: ['.cpp', '.hpp', '.c++', '.h++', '.cc', '.hh', '.cxx', '.hxx'],
  multiLineComment: require('./common/c-style.js').multiLine(),
  singleLineComment: require('./common/c-style.js').singleLine()
}
