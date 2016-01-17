var autoBabel = require('./calculateWhiteList.js');
var debug = require('debug')('preset-auto');
debug(autoBabel(process.env.PRESET_NODE_VERSION));
module.exports = {
    plugins: autoBabel(process.env.PRESET_NODE_VERSION).map(function (plugin) {
	return require(plugin);
    })
}
