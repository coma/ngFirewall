module.exports = function(grunt) {

    grunt.initConfig({
        pkg    : grunt.file.readJSON('bower.json'),
        uglify : {
            options: {
                banner : '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> license */\n',
                enclose: {},
                mangle : false
            },
            dist: {
                files: {
                    'dist/ngFirewall.min.js': [
                        'src/main.js',
                        'src/auth.js',
                        'src/user.js',
                        'src/config.js',
                        'src/run.js'
                    ]
                }
            }
        }
    });

    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['uglify:dist']);
};
