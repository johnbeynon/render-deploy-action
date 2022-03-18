# comment-patterns

> A list of comment-patterns for different languages

This module contains an extract of the [language-database of ](http://nevir.github.io/groc/languages.html)`groc`
with information about how single- and multi-line comments are written in different languages.

## Basic usage

```js
var commentPattern = require('comment-patterns');
var p = commentPattern('filename.js');
```

This will lead to `p` being:

```js
{
  name: "JavaScript",
  nameMatchers: [".js"],
  multiLineComment: [{
    start: /\/\*\*/,
    middle: "*",
    end: "*/",
    apidoc: true
  }, {
    start: /\/\*/,
    middle: "*",
    end: "*/"
  }],
  singleLineComment: [{
    start: "//"
  }]
}
```

* **name** is the name of the language
* **nameMatchers** is an array of file extensions of filenames that
files in this language usually have.
* **multiLineComment** is an array of patterns for comments that may span multiple lines
  - **start** is the beginning of a comment
  - **middle** is a character of a regex that occurs in front of each comment line
  - **end** marks the end of the comment
* **singleLineComment** is the prefix of comments that go until the end of the line

## Variation (regex)

It is also possible to retrieve a regular expression that matches comments
(up to the next line of code):

```js
var re = commentPattern.regex('filename.js');
```

The result `re` will be:

```js
{
  regex: /^([ \t]*)(\/\*\*([\s\S]*?)\*\/|\/\*([\s\S]*?)\*\/|((?:[ \t]*?\/\/.*\r?\n?)+))[\r\n]*/gm,
  cg: {
    indent: 1,
    wholeComment: 2,
    contentStart: 3
  },
  middle: [/^[ \t]*\*/gm, /^[ \t]*\*/gm, /^[ \t]*\/\//gm],
  name: "JavaScript",
  info: [{
    type: "multiline",
    apidoc: true
  }, {
    type: "multiline"
  }, {
    type: "singleline"
  }]
}
```

* **regex** is the actual regular expression. It matches the comments in a string,
including any empty lines after the comment.
* **cg** are constant values refering to capturing groups of the regex.
  - `match[cg.indent]` contains the spaces that indent comment-start-delimiter.
  - `match[cg.wholeComment]` matches the comment including delimiters.
  - `match[cg.contentStart]` is the first group that captures the contents of the comment
In this case, there are multiple possible delimiters, so dependending on which
delimiter is used, `match[cg.contentStart]` or `match[cg.contentStart + 1]` is
filled. the others are undefined.
* **middle** contains one pattern for each group after `  cg.contentStart` that matches
the prefix used before comment lines. It can be used to remove this prefix.
If the middle-prefix for this capturing group is empty (`''`), the pattern is `null`.
* **info** contains additional information for each group after `  cg.contentStart`, currently
this information is only `{ apidocs: true }` if the group is matching an apidoc comment.
* **name** is the language name for debugging purposes.

## Variation (codeContext)

For API-documentation, it is important to determine the context of the comment (i.e.
the thing that the comment is documenting). Although this does not strictly belong to
the comment itself, this library also has methods to determine the code-context of a comment
These are functions that return a json by matching a single-line of code against a regular expression.

```js
var detector = commentPattern.codeContext("filename.js");
var cc = detector("function abc(param1,param2) {",2);
```

The result in `cc` will be

```js
{
  begin: 2,
  type: "function statement",
  name: "abc",
  params: ["param1", "param2"],
  string: "abc()",
  original: "function abc(param1,param2) {"
}
```

This result (for 'JavaScript' is actuall taken from the `parse-code-context` module by Jon Schlinkert.
The method `codeContext` returns a `Detector`

## API-Reference

### [commentPattern](index.js#L30)

Load the comment-pattern for a given file.
The file-language is determined by the file-extension.

**Params**

* `filename` **{string}**: the name of the file
* `returns` **{object}**: the comment-patterns

### [.commentPattern.regex](index.js#L49)

Load the comment-regex for a given file.
The result contains a regex that matches the comments
in the specification. It also has information about
which the different capturing groups of an object.

**Params**

* `filename` **{string}**: the name of the file
* `returns` **{object}**: an object containing regular expressions and capturing-group metadata, see usage example for details

### The code-context detector

### [Detector](lib/detector.js#L18)

Create a new detector. A detector contains a list of parsers which extract the
code context from a list of nodes.
It is an immutable object that can be `extend`ed, creating a new instance with more parsers.

**Params**

* **{function(string)}**: parsers

### [.extend](lib/detector.js#L27)

Creates an extended Detector with additional parsers. A new instance will be created.
The old `Detector` remains untouched.

**Params**

* **{function(string)}**: moreParsers more parsers. Those are inserted at the beginning of the list, so they override existing parsers.
* `returns` **{Detector}**: a new Detector instance

### [.detect](lib/detector.js#L40)

Perform detection. This method calls the included parsers one after another
and returns the first-non-null result. The line-number is returned
as `begin`-property in the result, but the parser-function can override it.

**Params**

* **{string}**: string the line-of-code
* **{number}**: lineNr the line-number
* `returns` **{object}**

### [.parser](lib/detector.js#L62)

Helper function to create a parser from a `regex` that matches a string
and a `resolver` that parses the

**Params**

* **{RegExp}**: regex a regular expression that is matched against a code-line.
* **{function(...string)}**: resolver a function that resolves the regex match into a code-context object. The function-parameters are the capturing groups of the regex
* `returns` **{function}**: a function that can be used as parser

## The database

The language-specification can be found in the
`languages`-directory. There is one file
for each language. The actual databases will be
created from these files on `prepublish`.

[The content of language database can be found here](docs/languages.md)

## Contributing

See the [contributing guide](docs/contributing.md)

## Run tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Related

[extract-comments](https://www.npmjs.com/package/extract-comments): Uses esprima to extract line and block comments from a string of JavaScript. Also optionally… [more](https://www.npmjs.com/package/extract-comments) | [homepage](https://github.com/jonschlinkert/extract-comments)

## Author

**Nils Knappmeier**

+ [github/nknapp](https://github.com/nknapp)
* [twitter/knappi79](http://twitter.com/knappi79)

## License

Released under the MIT license.

***