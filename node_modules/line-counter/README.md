# line-counter [![NPM version](https://badge.fury.io/js/line-counter.svg)](http://badge.fury.io/js/line-counter)  [![Build Status](https://travis-ci.org/nknapp/line-counter.svg)](https://travis-ci.org/nknapp/line-counter)  [![Coverage Status](https://img.shields.io/coveralls/nknapp/line-counter.svg)](https://coveralls.io/r/nknapp/line-counter)

> A simple class that allows to count lines while iterating over a string

This module helps you when you want to output the line-number of certain locations in a string while iterating over the string otherwise.
For example, if you want to

## Example

Suppose, we want to extract all occurences of 'sed' and 'ipsum' from the following text:

```txt
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
```

We can easily match all the occurences with a regex, but we only get the char-index of each match.
Using the `line-counter` module, we can print line-numbers as well:

```js
var regex = /sed|ipsum/g;
var text = require("fs").readFileSync("example.txt");

var LineCounter = require("line-counter");
var counter = new LineCounter(text);

var match;
while ((match = regex.exec(text)) !== null) {
    // Example for .countUpTo()
    console.log(
        "Found '" + match[0] + "'",
        "at index", match.index,
        "which is in line ", counter.countUpTo(match.index)
    );
    // Example for .locate()
    console.log(
        "Found '" + match[0] + "'",
        "at index", match.index,
        "which is at location", counter.locate(match.index)
    );
}
```

### API

### [LineCounter](index.js#L44)

Create a new LineCounter instance counting lines in a given string. The class provides a method `countUpTo` that pushes an internal counter to the line of a specified char-index in the string.

Example:

**Params**

* `contents` **{string}**: the string that is parsed (i.e. file contents)

**Example**

```js
var LineCounter = require('line-counter');
var lc = new LineCounter('abc\ncde\nefg');
lc.countUpTo(0); // == 1
lc.countUpTo(8); // == 3
```

### [.countUpTo](index.js#L70)

Returns the line-number of a given char-index within the string.

**Params**

* `upTo` **{number}**: a char-index within the `contents`-string. This char-index must be greater or equal to the line-start of the last char-index passed to the previous call to `countUpTo`
* `returns` **{number}**: the line-number of this char-index.

### [.locate](index.js#L111)

Returns the location (line-nr and column-nr) of a char index
within the string.

* `returns` **{{column: number, line: number}**: line- and column-index (based off `1`)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nknapp/line-counter/issues/new)

## Author

**Nils Knappmeier**

+ [github/nknapp](https://github.com/nknapp)
* [twitter/knappi79](http://twitter.com/knappi79)

## License

Released under the MIT license.

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## Upcoming

### Add

* Added `.locate(charIndex)` to return line- and column-index of the char-index location

## v1.0.3 - 2015-05-11

### Fix
* Issue #1: Endless-Loop calling `.upTo(content.length)` for contents that end with a new-line.

## v1.0.2 - 2015-05-10

### Added
* Initial version of the line-counter module