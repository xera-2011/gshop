const merge = require("webpack-merge");// 因为webpack被分成了几个配置文件,而webpack-merge允许连接数组并合并对象
const base = require("./webpack.base");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {

    // // Paths
    // // 静态资源文件夹
    // assetsSubDirectory: 'static',
    // // 发布路径
    // assetsPublicPath: '/',

    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    },


    compress: true, //启用压缩
    port: 1207,     //端口
    open: true,      //自动打开浏览器 false关闭
    hot: true
  },
  // 排除打包
  // externals: {
  //     // key 就是包名
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     axios: 'axios'
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})