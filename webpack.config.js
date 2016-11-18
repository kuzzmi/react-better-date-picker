var path = require('path');

var entry = [ './src/react-better-date-picker.js' ];

module.exports = {
    devtool: 'cheap-module-source-map',
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
    }
};
