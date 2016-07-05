// Karma configuration

const webpackConfig = require('./webpack.config');

webpackConfig.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        basePath: __dirname,

        frameworks: ['jasmine'],

        files: [
            'test/loadtests.js'
        ],

        exclude: [ ],

        preprocessors: {
            'test/loadtests.js': [ 'webpack', 'sourcemap' ]
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
