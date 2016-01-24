var debug = require('debug')('preset-auto');
var data = require('./data.json');
var semver = require('semver');
var truncate = require('semver-truncate');

function calculateNodeVersions(nodeString) {
    var possibleVersions = Object.keys(data).filter(function(version) {
	return version.indexOf('v') === 0 || version.indexOf('iojs') === 0
    }).filter(function(version) {
	var normalized = version.replace('iojs-', '').replace(/^v/, '');
	return semver.satisfies(normalized, nodeString);
    });

    return possibleVersions;
}

var calculateWhiteList = function (nodeString) {
    var knownVersions = Object.keys(data);
    var versions = [];
    var plugins = {};

    versions = calculateNodeVersions(nodeString);

    // Attempt reconciliation to account for delay in node releasing
    // a new version and this module updating data
    if (versions.length === 0 && semver.valid(nodeString))  {
	var validVersion = semver.valid(nodeString);
	var majorRoot = 'v' + truncate(validVersion, 'major');
	if (knownVersions.indexOf(majorRoot) >= 0) {
	    debug('Truncating to a recent on same major');
	    versions.push(majorRoot);
	} else {
	    debug('Decrementing majors of ' + validVersion + ' until we find a a version that works');
	    var version = semver.parse(validVersion);
	    while (version.major >= 0) {
		version.major = version.major - 1;
		if (knownVersions.indexOf('v' + version.format()) >= 0) {
		    var foundVersion = 'v'  + version.format();
		    console.log('[WARN]', 'Could not satisfy ' + nodeString + '. Assuming feature support of ' + foundVersion);
		    versions.push(foundVersion);
		    break;
		}
	    }
	}
    }

    debug(versions);

    if (versions.length === 0)  {
	throw new Error('babel-preset-es2015-auto unable to find an appropriate environment from: ' + nodeString);
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
