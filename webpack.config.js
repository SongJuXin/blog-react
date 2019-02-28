/**
 * Created by songsong on 2017/10/31.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


module.exports = {
    entry: {
        index:['./src/index.js',hotMiddlewareScript]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: publicPath
    },
    devServer: {
        contentBase: './build',
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/\.js$/,
                use:[
                    'babel-loader'
                ],
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ]
};