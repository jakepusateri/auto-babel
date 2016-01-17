# babel-preset-es2015-auto
babel-preset-es2015-auto is a project that aims to bring [autoprefixer](https://github.com/postcss/autoprefixer)-like functionality to [babel](https://github.com/babel/babel).

## Install

```sh
$ npm install --save-dev babel-preset-es2015-auto
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2015-auto"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2015-auto
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015-auto"]
});
```

babel-preset-es2015-auto only requires the transformers needed based on feature support. For example, if the node version you plan to use supports `let` and `const`, you don't need to run the `transform-es2015-block-scoping` plugin.

Until preset options are figured out ([issue](https://phabricator.babeljs.io/T2756)), use the environment variable PRESET_NODE_VERSION to set minimum node to support.

By default, the running version of node will be used.

```sh
$ PRESET_NODE_VERSION='> 5.4' babel script.js --presets es2015-auto
```

### CLI

     ./cli.js -e '> 5.4'

    [ 'babel-plugin-transform-es3-property-literals',
      'babel-plugin-transform-es2015-destructuring',
      'babel-plugin-transform-es2015-function-name',
      'babel-plugin-transform-es2015-parameters',
      'babel-plugin-transform-es2015-sticky-regex',
      'babel-plugin-transform-es2015-unicode-regex',
      'babel-plugin-transform-es2015-modules-commonjs',
      'babel-plugin-transform-regenerator' ]

### Development

Install project dependencies

    npm install

### node/iojs tests
Run the tests

    make run-node
    
Files are output to "build/results" in json format

### Process results

`node processResults.js` creates/updates the `data.json` file used at runtime.