var path = require('path');
// var webpack = require('webpack');

var entry = [ './src/react-better-date-picker.js' ];

module.exports = {
    devtool: 'cheap-module-source-map',
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        library: 'react-better-date-picker',
        libraryTarget: 'amd',
        publicPath: '/dist/'
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
    }
};
