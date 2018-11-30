const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/',
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }            
        ]
    },
}