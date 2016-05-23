const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, '../dist'),
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, '../dist/client/index.js')
        ]
    },
    output: {
        path: path.join(__dirname, '../dist/public/js'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'BROWSER': JSON.stringify(true)
            }
        }),
        new ExtractTextPlugin('css/[name].bundle.css', {
            disable: true
        }
    ]
};
