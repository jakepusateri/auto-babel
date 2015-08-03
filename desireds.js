'use strict';
var b2s = require('browserslist-saucelabs');
var browsers = b2s({browsers: ['last 2 versions', '> 2%']})
module.exports = browsers;
