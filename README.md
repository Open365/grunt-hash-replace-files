# grunt-hash-replace-files

> Hash passed files and replace these occurrences

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hash-replace-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hash-replace-files');
```

## The "hash_replace_files" task

### Overview
In your project's Gruntfile, add a section named `hash_replace_files` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hash_replace_files: {
    options: {
      files: ['./test/expected/translations/**/*.json'],
      whereToReplace: ['./test/expected/main.js']
    }
  },
});
```

### Options

#### options.files
Type: `Array`
Default value: `[]`

Files to be hashed.

#### options.whereToReplace
Type: `Array`
Default value: `[]`

Files where you want to replace file references in the code for the hashed ones. 

### Usage Examples

#### Default Options
In this example we've hashed a whole translations folder, 
renamed each file inside translations folder for a hash like `translation.da39a3ee5e6b4b0d3255bfef95601890afd80709.json` 
and replaced the ocurrences of tranlstation.json in `main.js`.


```js
grunt.initConfig({
  hash_replace_files: {
    options: {
      files: ['./test/expected/translations/**/*.json'],
      whereToReplace: ['./test/expected/main.js']
    }
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
