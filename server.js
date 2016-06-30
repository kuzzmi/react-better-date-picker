
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const port = 3300;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        chunkModules: false,
        colors: true,
    },
}).listen(port, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Listening at localhost:${port}`);
});

