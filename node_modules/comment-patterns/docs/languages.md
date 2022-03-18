## The database

These are the base entries (no variations) of the database:


### C
```js
{
  srcFile: "c.js",
  name: "C",
  nameMatchers: [".c", ".h"],
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


### Clojure
```js
{
  srcFile: "clojure.js",
  name: "Clojure",
  nameMatchers: [".clj", ".cljs"],
  singleLineComment: [{
    start: ";;"
  }]
}
```


### CoffeeScript
```js
{
  srcFile: "coffeescript.js",
  name: "CoffeeScript",
  nameMatchers: [".coffee", "Cakefile"],
  multiLineComment: [{
    start: "###*",
    middle: / \*|#/,
    end: "###"
  }, {
    start: "###",
    middle: "#",
    end: "###"
  }],
  singleLineComment: [{
    start: "#"
  }]
}
```


### C++
```js
{
  srcFile: "cplusplus.js",
  name: "C++",
  nameMatchers: [".cpp", ".hpp", ".c++", ".h++", ".cc", ".hh", ".cxx", ".hxx"],
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


### CSharp
```js
{
  srcFile: "csharp.js",
  name: "CSharp",
  nameMatchers: [".cs"],
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


### CSS
```js
{
  srcFile: "css.js",
  name: "CSS",
  nameMatchers: [".css"],
  multiLineComment: [{
    start: /\/\*\*/,
    middle: "*",
    end: "*/",
    apidoc: true
  }, {
    start: /\/\*/,
    middle: "*",
    end: "*/"
  }]
}
```


### Go
```js
{
  srcFile: "go.js",
  name: "Go",
  nameMatchers: [".go"],
  singleLineComment: [{
    start: "//"
  }]
}
```


### Handlebars
```js
{
  srcFile: "handlebars.js",
  name: "Handlebars",
  nameMatchers: [".handlebars", ".hbs"],
  multiLineComment: [{
    start: "<!--",
    middle: "",
    end: "-->"
  }, {
    start: "",
    apidoc: true
  }, {
    start: ""
  }]
}
```


### Haskell
```js
{
  srcFile: "haskell.js",
  name: "Haskell",
  nameMatchers: [".hs"],
  singleLineComment: [{
    start: "--"
  }]
}
```


### HTML
```js
{
  srcFile: "html.js",
  name: "HTML",
  nameMatchers: [".htm", ".html"],
  multiLineComment: [{
    start: "<!--",
    middle: "",
    end: "-->"
  }]
}
```


### Jade
```js
{
  srcFile: "jade.js",
  name: "Jade",
  nameMatchers: [".jade"],
  singleLineComment: [{
    start: "//"
  }, {
    start: "//-"
  }]
}
```


### Jake
```js
{
  srcFile: "jake.js",
  name: "Jake",
  nameMatchers: [".jake"],
  singleLineComment: [{
    start: "//"
  }]
}
```


### Java
```js
{
  srcFile: "java.js",
  name: "Java",
  nameMatchers: [".java"],
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


### JavaScript
```js
{
  srcFile: "javascript.js",
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


### JSON
```js
{
  srcFile: "json.js",
  name: "JSON",
  nameMatchers: [".json"]
}
```


### JSP
```js
{
  srcFile: "jsp.js",
  name: "JSP",
  nameMatchers: [".jsp"],
  multiLineComment: [{
    start: "<!--",
    middle: "",
    end: "-->"
  }, {
    start: "<%--",
    middle: "",
    end: "--%>"
  }]
}
```


### LaTeX
```js
{
  srcFile: "latex.js",
  name: "LaTeX",
  nameMatchers: [".tex", ".latex", ".sty"],
  singleLineComment: [{
    start: "%"
  }]
}
```


### LESS
```js
{
  srcFile: "less.js",
  name: "LESS",
  nameMatchers: [".less"],
  singleLineComment: [{
    start: "//"
  }],
  multiLineComment: [{
    start: /\/\*\*/,
    middle: "*",
    end: "*/",
    apidoc: true
  }, {
    start: /\/\*/,
    middle: "*",
    end: "*/"
  }]
}
```


### LiveScript
```js
{
  srcFile: "livescript.js",
  name: "LiveScript",
  nameMatchers: [".ls", "Slakefile"],
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
    start: "#"
  }]
}
```


### Lua
```js
{
  srcFile: "lua.js",
  name: "Lua",
  nameMatchers: [".lua"],
  singleLineComment: [{
    start: "--"
  }]
}
```


### Make
```js
{
  srcFile: "make.js",
  name: "Make",
  nameMatchers: ["Makefile"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### Markdown
```js
{
  srcFile: "markdown.js",
  name: "Markdown",
  nameMatchers: [".md", ".markdown", ".mkd", ".mkdn", ".mdown"],
  commentsOnly: true
}
```


### Mustache
```js
{
  srcFile: "mustache.js",
  name: "Mustache",
  nameMatchers: [".mustache"],
  multiLineComment: [{
    start: ""
  }]
}
```


### Objective-C
```js
{
  srcFile: "objective-c.js",
  name: "Objective-C",
  nameMatchers: [".m", ".mm"],
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


### Perl
```js
{
  srcFile: "perl.js",
  name: "Perl",
  nameMatchers: [".pl", ".pm"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### PHP
```js
{
  srcFile: "php.js",
  name: "PHP",
  nameMatchers: [".php", ".php3", ".php4", ".php5", ".fbp"],
  singleLineComment: [{
    start: "//"
  }]
}
```


### Puppet
```js
{
  srcFile: "puppet.js",
  name: "Puppet",
  nameMatchers: [".pp"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### Python
```js
{
  srcFile: "python.js",
  name: "Python",
  nameMatchers: [".py"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### Ruby
```js
{
  srcFile: "ruby.js",
  name: "Ruby",
  nameMatchers: [".rb", ".ru", ".gemspec"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### Sass
```js
{
  srcFile: "sass.js",
  name: "Sass",
  nameMatchers: [".sass"],
  singleLineComment: [{
    start: "//"
  }]
}
```


### SCSS
```js
{
  srcFile: "scss.js",
  name: "SCSS",
  nameMatchers: [".scss"],
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


### Shell
```js
{
  srcFile: "shell.js",
  name: "Shell",
  nameMatchers: [".sh", ".bash"],
  singleLineComment: [{
    start: "#"
  }]
}
```


### SQL
```js
{
  srcFile: "sql.js",
  name: "SQL",
  nameMatchers: [".sql"],
  singleLineComment: [{
    start: "--"
  }]
}
```


### Swift
```js
{
  srcFile: "swift.js",
  name: "Swift",
  nameMatchers: [".swift"],
  multiLineComment: [{
    start: /\/\*\*?/,
    middle: "*",
    end: "*/"
  }],
  singleLineComment: [{
    start: "//"
  }]
}
```


### TypeScript
```js
{
  srcFile: "typescript.js",
  name: "TypeScript",
  nameMatchers: [".ts"],
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


### YAML
```js
{
  srcFile: "yaml.js",
  name: "YAML",
  nameMatchers: [".yml", ".yaml"],
  singleLineComment: [{
    start: "#"
  }]
}
```


