const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    filename: '[name].[hash].js',//[hash]是为了避免js缓存
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
          // "style-loader",
          // "vue-style-loader",
          MiniCssExtractPlugin.loader,   // 抽离css
          "css-loader",// 用来解析@import这种语法,
          'postcss-loader'// 添加兼容浏览器的前缀(还需要一个postcss.config1.js)
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,   // 抽离css
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,   // 抽离css
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          // loader: 'url-loader?limit=8192&name=[hash:8]-[name].[ext]',
          loader: 'url-loader',
          options: {
            // publicPath: 'http://www.mayufo.cn', // 地址前缀 传到服务器也能访问
            limit: 1,  // 200k 200 * 1024
            outputPath: 'img/'   // 打包后图片输出地址
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({// 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
      filename: './index.html',     //打包后生成文件
      template: './src/index.html', //模板文件
      hash: true, // 添加hash值解决缓存问题
      minify: { // 对打包的html模板进行压缩
        removeAttributeQuotes: true, // 删除属性双引号
        collapseWhitespace: true // 折叠空行变成一行
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"////将css都提到打包目录下的css目录中
    }),
    new ProgressBarPlugin()//打包进度条
  ]
}