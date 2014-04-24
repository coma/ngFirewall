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
                        'src/VoterInterface.js',
                        'src/FirewallVoter.js',
                        'src/ngFirewall.js'
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
