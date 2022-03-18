var regex = /sed|ipsum/g;
var text = require("fs").readFileSync("example.txt");

var LineCounter = require("../");
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
