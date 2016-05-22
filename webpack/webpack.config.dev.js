const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, '../dist'),
    entry: {
        index: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, '../dist/client/index.js')
        ]
    },
    output: {
        path: path.join(__dirname, '../dist/public/js'),
        filename: '[name].bundle.js',
        publicPath: '/js'
    }/*,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    plugins: [ 'transform-object-assign' ],
                    presets: [ 'react', 'es2015', 'stage-0' ]
                }
            }
        ]
    }*/,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};