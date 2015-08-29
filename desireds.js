var bs = require('browserslist');
var b2s = require('browserslist-saucelabs');
var versions = '> 0%';
var debug = require('debug')('autobabel');
var browsers = [];
for (var version of bs(versions)) {
    if (version.split(' ')[1] === '0') {
	version = bs('last 1 ' + version.split(' ')[0] + ' versions');
    }
    var browser = b2s({browsers: version})
    if (browser.length > 0) {
	browser[0].blVersion = version;
	browsers.push(browser[0]);
    } else {
	debug('Could not find appropriate sauce labs for: ' + version);
    }
}
module.exports = browsers;
