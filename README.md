# auto-babel
auto-babel is a project that aims to bring [autoprefixer](https://github.com/postcss/autoprefixer-core#usage)-like functionality to [babel](https://github.com/babel/babel).

## Word of warning
Use with caution: auto-babel doesn't yet include support for android browsers or android chrome. Also, the tests run ([es-feature-tests](https://github.com/getify/es-feature-tests)) aren't indicate of perfect spec compliance.

## Using auto-babel

auto-babel outputs a list of transformers to blacklist based on feature support. For example, if all the browsers and environments you target support `let` and `const`, you don't need to run the `es6.blockScoping` transpiler.

### API

    var autoBabel = require('auto-babel');

    var blacklistedTransformers = autoBabel('last 2 versions');
    babel.transform(code, { blacklist: blacklistedTransformers });

### CLI

     ./cli.js -e 'last 2 Chrome versions'
     
      [ 'es6.blockScoping',
        'es6.classes',
        'es6.constants',
        'es6.objectSuper',
        'es6.properties.shorthand',
        'es6.spec.blockScoping',
        'es6.spec.symbols',
        'es6.spec.templateLiterals',
        'es6.templateLiterals',
        'regenerator' ]

## Running the tests
### Environment setup

Install the grunt command line tool

    npm install grunt-cli -g

Install project dependencies

    npm install

### node/iojs tests
Run the tests

    make run-node
    
Files are output to "build/results" in json format

### browser tests
The browser tests are run using [sauce labs](https://saucelabs.com/) so all tests can be run from a single computer.

1. Add sauce labs credentials.
```
    export SAUCE_USERNAME=$USERNAME
    export SAUCE_ACCESS_KEY=$KEY
```
2. Set up sauce connect tunnel
```
    node_modules/sauce-tunnel/vendor/linux/bin/sc -D featuretests.io
```
3. run the tests
```
    make run-browser
```

### Process results

`node processResults.js` creates/updates the `data.json` file used at runtime.