var glob = require('glob');
var results = {};

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

glob('build/results/**.json', null, function (err, files) {
    files.forEach(function (filename) {
	var result = require('./' + filename);
	results[filename] = result;
	var count = 0;
	for (var existence in result) {
	    if (result[existence]) {
		count += 1;
	    }
	}
	//console.log(filename + ': ' + count);
    });
    console.log(files.length + ' files detected');
    Object.keys(results[files[0]]).forEach(function (feature) {
	var count = 0;
	files.forEach(function (filename) {
	    if (results[filename][feature]) {
		count += 1;
	    }
	});
	//console.log(feature + ' correct in ' + count + ' of ' + files.length + ' environments');
    });

    Object.keys(mappings).forEach(function(babelName) {
	var count = 0;
	files.forEach(function (filename) {
	    var supportsAll = true;
	    mappings[babelName].forEach(function (feature) {
		supportsAll = supportsAll && results[filename][feature];
	    });
	    count += supportsAll ? 1 : 0;
	});
	console.log(babelName + ' correct in ' + count + ' of ' + files.length + ' environments');
    });
})

