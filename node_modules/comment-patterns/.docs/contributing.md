# Contributing

You can contribute by supplying new patterns for languages and by fixing errors 
in existing language definitions. This is especially true for the `apidoc: true`
property, which marks a comment patterns to be used as apidoc-comment for the given
language (see [the c-style.js](languages/patterns/common/c-style.js)) 

Small changes can be done in a pull-request without an issue.

If you think there is useful information that should be provided in the database,
please create an issue before makeing a pull request. Since the database is 
precompiled and stored in a single file, there is always a trade-off between
adding new features (fields) and keeping the file-size small.

Variations such as the `.regex()`-function are derived from core database and precompiled
into a single file. If you think there should be another variation, please create an issue
before submitting a pull-request.


# Creating variations and indexes 

Internally, the whole database is stored in two parts:

* The **database** itself is stored as commonjs-module in a javascript-file.
  It is essentially an array containing on entry for each language
* **Indexes** for the database are store in separated commonjs-modules (also in javascript-files).
  It allows quick access to the database by providing a javascript-object with the index-value as 
  key and the database element-index as value.

The `commentPatterns`-method first looks for the given file-extension in the `by-matcher.js` index 
and then loads the appropriate entry from the database-array.
  
The database, its variations and indexes are created in the [generate-db.js](../build/generate-db.js)
script which makes use of the [Generator](../build/generator.js) class.

In order to create a new index, you can do

```js
var generator = new Generator();
generator.createIndex(indexFunction).writeTo(databaseDir, "by-name.js");
```

**indexFunction** must return a string or an array of string for an entry of the core-database. 
If the result is an array, every element is used as key for the entry.

In order to create a new variation, do 

```js
generator.transform(transformFunction).writeTo(databaseDir, "regexes.js");
```

**transformFunction** must return a new object for a given database-entry. The function
is called like `Array#map` for each entry in the database.

Simple transform- and index-functions can be included in `generate-db.js`. More complex ones 
should be put in a separate file in the `variations` directory.

## Updating the language-database

The language-specifications where initially pulled from the  
[language-database of `groc`](http://nevir.github.io/groc/languages.html).

Pulling updates from `groc` into the files in `languages/patterns` is not such
a good idea anymore: Almost all files have been changed manually, so there would be 
a lot of conflicts to resolve. However, it is still possible, since the scripts are 
still there:

```bash                                        
npm i -d && npm run-script update-from-groc
```

**Be careful not to submit any regressions after updating the database.**
