#!/usr/bin/env node

var autoBabel = require('./index.js');
var argv = require('yargs')
    .alias('e', 'envs')
    .example('$0 -e "last 2 Chrome versions"')
    .alias('n', 'node')
    .example('$0 -n "> 0.12.0"')
    .help('h')
    .alias('h', 'help')
    .argv;

console.log(autoBabel(argv.envs, argv.node));

