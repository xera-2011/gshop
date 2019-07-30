const merge = require('webpack-merge');// 因为webpack被分成了几个配置文件,而webpack-merge允许连接数组并合并对象
const base = require("./webpack.base.js");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');//支持ES6语法 uglifyjs是以前的方法了,这个是新的
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),//支持ES6语法
      new OptimizeCSSAssetsPlugin({})//压缩css插件
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {//打包之前先删除原有的
      root: path.resolve(__dirname, '../'),
    }),
    new BundleAnalyzerPlugin()
  ]
})