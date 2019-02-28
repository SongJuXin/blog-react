/**
 * Created by songsong on 2017/11/6.
 */
/*参照https://github.com/glenjamin/webpack-hot-middleware*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const  ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        vendor:['react','react-dom'],
        main: ['webpack-hot-middleware/client', './src1/app.js']
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve('dist'),
        publicPath: '/'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('src1'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["babel-preset-env", {
                                targets: {
                                    /*支持大部分浏览器最新的两个版本以及ie9+*/
                                    browsers: ["last 2 versions", "ie >= 9"]
                                }
                            }],
                            'babel-preset-react',
                            'stage-0'
                        ], //需要安装babel-plugin-import，处理antd按需加载
                        plugins:[["import", {
                            "libraryName": "antd",
                            "style": true,   // or 'css'
                        }]]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                //less-loader依赖less,因此安装时要把less安装了
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","less-loader"]
                })
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src1/index.html', title: '这是标题'}),
        //new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"]
        }),
        new ExtractTextPlugin("styles.css"),
    ]

}
module.exports = config



