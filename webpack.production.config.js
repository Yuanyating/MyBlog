const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true, // 指定启用css modules
                    }
                },{
                    loader: "postcss-loader"
                }
            ]
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),//分配id
        new webpack.optimize.UglifyJsPlugin(),//压缩js代码
        new ExtractTextPlugin("style.css")
    ],
};