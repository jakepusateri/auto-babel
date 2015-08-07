var debug = require('debug')('autobabel');
var bs = require('browserslist');
var data = require('./data.json');
var semver = require('semver');
var mappings = {
    "es6.arrowFunctions": ["arrow"],
    "es6.blockScoping": ["letConst","letLoop","constLoop"],
    "es6.classes": ["classes"],
    "es6.constants": ["letConst","constLoop"],
    "es6.destructuring": ["destructuring","paramDestructuring"],
    "es6.modules": ["moduleExport","moduleImport"],
    "es6.objectSuper": ["objectSuper"],
    "es6.parameters.default": ["defaultParameter"],
    "es6.parameters.rest": ["spreadRest"],
    "es6.properties.computed": ["computedProperty"],
    "es6.properties.shorthand": ["conciseMethodProperty"],
    "es6.regex.sticky": ["stickyRegExp"],
    "es6.regex.unicode": ["unicodeRegExp"],
    "es6.spec.blockScoping": ["letTDZ","letLoopScope"],
    "es6.spec.symbols": ["symbolImplicitCoercion"],
    "es6.spec.templateLiterals": ["templateString"],
    "es6.spread": ["spreadRest"],
    "es6.tailCall": ["TCO"],
    "es6.templateLiterals": ["templateString"],
    "regenerator": ["generator"]
};

Object.keys(mappings).forEach(function(babelName) {
    var count = 0;
    Object.keys(data).forEach(function (env) {
	var supportsAll = true;
	mappings[babelName].forEach(function (feature) {
	    supportsAll = supportsAll && data[env][feature];
	});
	if (supportsAll) {
	    count += 1;
	    data[env][babelName] = true;
	}
    });
    debug(babelName + ' passing in ' + count + ' of ' + Object.keys(data).length + ' environments');
});

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

var getBlacklist = function (browserString, nodeString) {
    var versions;
    if (typeof browserString === 'string') {
	versions = bs(browserString);
    } else {
	versions = bs();
    }

    if (nodeString) {
	versions = versions.concat(calculateNodeVersions(nodeString));
    }

    debug(versions);
    
    var potentialBlacklist = [];
    Object.keys(mappings).forEach(function(babelName) {
	var allPassed = true;
	versions.forEach(function (env) {
	    if (data[env]) {
		allPassed = allPassed && data[env][babelName];
	    } else {
		allPassed = false;
	    }
	});
	if (allPassed) {
	    potentialBlacklist.push(babelName);
	}
    });

    debug(potentialBlacklist);

    return potentialBlacklist;
};

module.exports = getBlacklist;
