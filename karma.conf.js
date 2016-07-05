// Karma configuration

const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'test/*.spec.js'
        ],

        exclude: [ ],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        // start these browsers
        // browsers: ['PhantomJS', 'Chrome'],
        browsers: ['PhantomJS'],

        singleRun: false,

        // Concurrency level
        concurrency: Infinity,

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'text' }
            ]
        },

        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    })
}
