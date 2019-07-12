const merge = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");

module.exports = merge(base ,{
    mode: 'development',
    devtool: 'source-map',
    devServer:{
        compress: true, //启用压缩
        port: 1207,     //端口
        open: true,      //自动打开浏览器 false关闭
        hot: true
    },
    externals: {
        // key 就是包名
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})