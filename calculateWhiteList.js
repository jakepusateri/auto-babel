var debug = require('debug')('preset-es2015-auto');
var data = require('./data.json');
var semver = require('semver');

function calculateNodeVersions(nodeString) {
    var possibleVersions = Object.keys(data).filter(function(version) {
	return version.indexOf('v') === 0 || version.indexOf('iojs') === 0
    }).filter(function(version) {
	var normalized = version.replace('iojs-', '').replace(/^v/, '');
	return semver.satisfies(normalized, nodeString);
    });

    debug(possibleVersions);

    return possibleVersions;
}

var calculateWhiteList = function (nodeString) {
    var versions = [process.version],
	plugins = {};

    if (nodeString) {
	versions = versions.concat(calculateNodeVersions(nodeString));
    }

    versions.forEach(function (version) {
	if (data[version] === undefined) {
	    debug(version + ' not found');
	} else {
	    data[version].forEach(function (plugin) {
		plugins[plugin] = true;
	    });
	}
    });
    // This plugin causes issues currently.
    delete plugins["babel-plugin-transform-es2015-generator-return"];

    debug(Object.keys(plugins));
    return Object.keys(plugins);
};

module.exports = calculateWhiteList;
