var files = require('../files');

module.exports = function(karma){

    karma.set({
        logLevel  : karma.LOG_ERROR,
        basePath  : '../',
        files     : [].concat(files.angular, files.src, files.test),
        frameworks: ['jasmine'],
        browsers  : ['PhantomJS'],
        plugins   : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ]
    });
};