const path    = require('path');
const webpack = require('webpack');

const entry = [
    './src/react-better-date-picker.js'
];

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [];

if (isProduction) {
    plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    );
}

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-better-date-picker.js',
        library: 'react-better-date-picker',
        libraryTarget: 'amd',
        publicPath: '/dist/'
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        moment: 'moment'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /build|node_modules/
        }]
    },
    plugins
};
