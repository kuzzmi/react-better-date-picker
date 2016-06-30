var path = require('path');
var webpack = require('webpack');

var entry = [ './demo/index.js' ];

if (process.env.NODE_ENV === 'development') {
    entry = entry.concat([
        'webpack-dev-server/client?http://localhost:3300',
        'webpack/hot/only-dev-server',
    ]);
}

module.exports = {
    devtool: 'eval',
    entry: entry,
    output: {
        path: path.join(__dirname, 'demo'),
        filename: 'bundle.js',
        publicPath: '/demo/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /build|node_modules/,
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }],
    },
};
