# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## v1.1.0 - 2015-06-05
### Add
- Added `.locate(charIndex)` to return line- and column-index of the char-index location

## v1.0.3 - 2015-05-11
### Fix
- Issue #1: Endless-Loop calling `.upTo(content.length)` for contents that end with a new-line.

## v1.0.2 - 2015-05-10
### Added
- Initial version of the line-counter module
