'use strict';
var bs = require('browserslist');
var b2s = require('browserslist-saucelabs');
var versions = '> 0%';
var browsers = [];
for (var version of bs(versions)) {
    var browser = b2s({browsers: version})
    if (browser.length > 0) {
	browser[0].blVersion = version;
	browsers.push(browser[0]);
    } else {
	//console.error('Could not find appropriate sauce labs for: ' + version);
    }
}
module.exports = browsers;
