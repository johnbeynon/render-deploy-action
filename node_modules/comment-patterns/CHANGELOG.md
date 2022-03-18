# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## v0.10.1 - 2018-10-04

### Chore

- Update dependency versions (Removes security vulnerability from lodash@3)


## v0.10.0 - 2018-10-04

### Add

- Multiline comment support for PHP (Sean Snyder)


## v0.9.0 - 2016-08-22
### Add

- Multiline comment support for Ruby and Python

## v0.8.1 - 2015-11-08

### Fix

- Apply JS-Standard Coding-Style
- Change method to detect whether standardjs or Thought are installed.

## v0.8.0 - 2015-07-20
### Add

- Code-Context-Functions for Handlebars

## v0.7.0 - 2015-06-14
### Fix
- Fix code-context detection for object properties that are functions.
  (i.e. "key: function(a,b) {")

### Add
- C-style multiline-comments splitted into multiple regexes (`/**`, and `/*`).
  `/**` is marked as "used for apidocs"
- Add `info` property to the output of `.regex`, which contains additional information
  (so far only the `apidoc: true` property.

### Breaking changes

- `.singleLineComment` is no longer and array of strings (`['#']` but an array
  of objects (`[ { start: '#' } ]`) in order to allow them to be marked
  as "used for apidocs". Definitions can be mixed in the languages-source-files,
  but will always appear in the second form in the compiled database.

## v0.6.0 - 2015-06-08
### Add
- Add function `.codeContext` to return code-context parser for different languages.

## v0.5.2 - 2015-05-27
### Add
- Multi-line-comments for Less

## v0.5.1 - 2015-05-24
### Add
- Add `.bash` as file-extension for shell-scripts.

## v0.5.0 - 2015-05-20
### Fix
- Remove "function()" from generated database files. This lead to an error in the test cases.

## v0.4.0 - 2015-05-20
### Fix
- Consecutive indented lines of single-line-comments are now recognized
  as a single comment by regexes
-

## v0.3.0 - 2015-05-15
### Changed
- Next-line-of-code is not matched anymode. The client has to extract the code itself.
  The line-number is still computed.


## v0.2.0 - 2015-05-14
### Changed
- Some comment delimiters are now regexes rather than strings
- Middle-prefix for C-like languages now allows a preceeding whitespace.

### Added
- Method `.regex` creates regular expressions that match comments

## v0.1.0 - 2015-05-04
### Changed
- Only strings are used to determine that language from the file extension
  `/php\d?/` is replaced by `php`,`php3`,...


## v0.0.x
### Initial version
