const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'], //后缀名自动补全
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "vue-style-loader",
                    "css-loader"
                ]
            },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=8192&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            // {
            //     test: /\.(png|jpg|gif|svg|ttf)$/,
            //     use: [
            //         {
            //             loader: 'url-loader'
            //             // options: {
            //             //     limit: 8192,// 图片大小限制 单位b
            //             // },
            //         },
            //     ],
            // },
            // {
            //     test: /\.(jpg|png|gif|svg)$/,
            //     use: [
            //         'file-loader' // 这个安装了, 但是打开使用就会不显示图片,也不报错
            //     ]
            // },
            {
                test: /\.less$/,
                use: ['style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader',
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',     //文件名
            template: './src/index.html', //模板文件
        }),
        new ProgressBarPlugin()           //打包进度条
    ]
}