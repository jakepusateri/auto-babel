# auto-babel
auto-babel is a project that aims to bring [autoprefixer](https://github.com/postcss/autoprefixer-core#usage)-like functionality to [babel](https://github.com/babel/babel).


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
    export SAUCE_USERNAME=<USERNAME>
    export SAUCE_ACCESS_KEY=<KEY>

2. Set up sauce connect tunnel
    node_modules/sauce-tunnel/vendor/linux/bin/sc -D featuretests.io

3. run the tests
    make run-browser

node processResults.js to list passing test count for each version