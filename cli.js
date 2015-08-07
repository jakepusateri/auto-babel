#!/usr/bin/env node

var autoBabel = require('./index.js');
var argv = require('yargs')
    .alias('e', 'envs')
    .example('$0 -e "last 2 Chrome versions"')
    .help('h')
    .alias('h', 'help')
    .argv;

console.log(autoBabel(argv.envs));

