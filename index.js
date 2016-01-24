var autoBabel = require('./calculateWhiteList.js');
var debug = require('debug')('preset-auto');
var version = process.env.PRESET_NODE_VERSION || process.version;
debug(autoBabel(version));
module.exports = {
    plugins: autoBabel(version).map(function (plugin) {
	return require(plugin);
    })
}
