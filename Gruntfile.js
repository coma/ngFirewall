var files = require('./files');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg    : grunt.file.readJSON('bower.json'),
        jshint : {
            options: {
                eqeqeq  : true,
                trailing: true
            },
            target : {
                src: ['src/*.js']
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                browsers  : ['PhantomJS'],
                singleRun : true,
                reporters: 'dots', // 'dots' || 'progress'
                port: 8080,
                colors: true,
                autoWatch: false,
                autoWatchInterval: 0
            }
        },
        uglify : {
            options: {
                banner : '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> license */\n',
                enclose: {}
            },
            dist: {
                files: {
                    'dist/ngFirewall.min.js': files.src
                }
            }
        }
    });

    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);

    grunt.registerTask('default', [
        'test',
        'uglify'
    ]);
};
