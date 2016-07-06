// Karma configuration

const path = require('path');

const webpackConfig = {
    devtool: 'inline-source-map',
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'isparta-loader',
            include: [
                path.join(__dirname, '/src')
            ]
        }],
        loaders: [{
            test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
            loader: 'null-loader'
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, '/src'),
                path.join(__dirname, '/test')
            ]
        }]
    }
};

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
        browsers: ['PhantomJS', 'Chrome', 'IE'],
        // browsers: ['PhantomJS'],

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
