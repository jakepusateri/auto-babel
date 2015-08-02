var glob = require('glob');
var results = {};
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
	console.log(filename + ': ' + count);
    });
})

