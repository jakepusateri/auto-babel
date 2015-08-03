'use strict';

var desireds = require('./desireds');

var gruntConfig = {
    env: {
        // dynamically filled
    },
    simplemocha: {
        sauce: {
            options: {
                timeout: 120000,
                reporter: 'spec'
            },
            src: ['test/sauce/**/*-specs.js']
        }
    },    
    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
        gruntfile: {
            src: 'Gruntfile.js'
        },
        test: {
            options: {
                jshintrc: 'test/.jshintrc'
            },                
            src: ['test/**/*.js']
        },
    },
    concurrent: {
        'test-sauce': [], // dynamically filled
    },
    connect: {
	server: {
	    options: {
		base: "",
		port: 9999
	    }
	}
    },
    watch: {
        gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
        },
        test: {
            files: '<%= jshint.test.src %>',
            tasks: ['jshint:test']
        },
    },
};
function getKey(browser) {
    return browser.browserName + browser.version
}

desireds.forEach(function(val) {
    var key = getKey(val);
    gruntConfig.env[key] = { 
        DESIRED: JSON.stringify(val)
    };
    gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig(gruntConfig);

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    // Default task.
    grunt.registerTask('default', ['connect', 'test:sauce:' + desireds[0].browserName + desireds[0].version]);
    grunt.registerTask('try', ['connect', 'watch']);
    desireds.forEach(function(desired) {
	var key = getKey(desired);
        grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
    });

    grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);
};
