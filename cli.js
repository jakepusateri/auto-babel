#!/usr/bin/env node

var autoBabel = require('./calculateWhiteList.js');
var argv = require('yargs')
    .alias('e', 'node')
    .example('$0 -e "> 0.12.0"')
    .help('h')
    .alias('h', 'help')
    .argv;
var version = argv.node || process.env.PRESET_NODE_VERSION || process.version;
console.log('Plugins required for ' + version);
console.log(autoBabel(version));
