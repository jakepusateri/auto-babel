var opts = require('babel-features').options();
console.log(JSON.stringify(opts.plugins.map(function (plugin) {
    return 'babel-plugin-' + plugin.toLowerCase();
})));
