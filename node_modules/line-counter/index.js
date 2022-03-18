/*
The MIT License (MIT)

Copyright (c) 2015 Nils Knappmeier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * Create a new LineCounter instance counting lines in a given string.
 * The class provides a method `countUpTo` that pushes an internal counter
 * to the line of a specified char-index in the string.
 *
 * Example:
 *
 * ```js
 * var LineCounter = require('line-counter');
 * var lc = new LineCounter('abc\ncde\nefg');
 * lc.countUpTo(0); // == 1
 * lc.countUpTo(8); // == 3
 * ```
 *
 * @param {string} `contents` the string that is parsed (i.e. file contents)
 * @constructor
 * @api public
 */
function LineCounter(contents) {

    // Regex to determine line endings [see XML-1.0 Spec Chapter 2.11 End-of-Line Handling](http://www.w3.org/TR/REC-xml/#sec-line-ends)
    var lineRegex = /\r\n?|\n/mg;

    // The number of the current line (the value is one-based,
    // but in the beginning, we are not on the first line yet).
    var currentLine = 0;

    // The end of the current line (in the beginning, we assume,
    // that the line before the first line ends just before the string).
    var eolIndex = -1;

    // The start of the current line
    var startOfLineIndex = -1;

    /**
     * Returns the line-number of a given char-index within the string.
     *
     *
     * @param {number} `upTo` a char-index within the `contents`-string. This char-index must
     *    be greater or equal to the line-start of the last char-index passed to the previous
     *    call to `countUpTo`
     * @returns {number} the line-number of this char-index.
     * @api public
     */
    this.countUpTo = function (upTo) {
        if (upTo >= contents.length) {
            throw new Error(
                "Index out of bounds! " +
                "Index " + upTo + " is beyond the end of the string."
            )
        }
        if (upTo < startOfLineIndex) {
            throw new Error(
                "Cannot go back to index " + upTo + ". " +
                "Current line ("+currentLine+") starts at index " + startOfLineIndex +"."
            );
        }
        // Go to the next line until the line
        // we hit the line following the 'upTo' index
        while (eolIndex < upTo) {
            // Next line
            currentLine++;
            // Move startOfLineIndex to the start of the next line
            startOfLineIndex = eolIndex + 1;
            // Find next line-end
            var match = lineRegex.exec(contents);
            if (match !== null) {
                // The end-of-line is the matched new-line character,
                // In case of a CRLF, it is the LF
                eolIndex = match.index + match[0].length - 1;
            } else {
                // If there is no match, then we are in the last line
                // so the eolIndex is the last character in the string.
                eolIndex = contents.length - 1;
            }
        }
        return currentLine;
    }

    /**
     * Returns the location (line-nr and column-nr) of a char index
     * within the string.
     * @returns {{column: number, line: number} line- and column-index (based off `1`)
     * @api public
     */
    this.locate = function(charIndex) {
        var line = this.countUpTo(charIndex);
        return {
            column: charIndex - startOfLineIndex + 1,
            line: line
        }
    }
}

module.exports = LineCounter;
