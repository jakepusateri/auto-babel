var glob = require('glob');
var results = {};
var fs = require('fs');
var path = require('path');

glob('build/results/**.json', null, function (err, files) {
    var name;
    files.forEach(function (filename) {
	var result = JSON.parse(fs.readFileSync(filename));
	name = path.basename(filename, '.json');
	results[name] = result;
	var count = 0;
	for (var existence in result) {
	    if (result[existence]) {
		count += 1;
	    }
	}
    });
    console.log(files.length + ' files processed');
    fs.writeFileSync('data.json', JSON.stringify(results, null, 4));
})

