const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HelloWorldPlugin = require('./src/HelloWorldPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // entry: path.join(__dirname, 'src/index.js'),
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'), // 决定静态文件在哪个文件夹下，这个时候使用的html会在dist文件夹下
    // publicPath: "http://localhost:7798/dist/",  //决定开发环境的js在哪个目录,推荐与输出的目录相同
    port: '7798',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ] 
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      // filename: path.join(__dirname, './dist/index.html')
    }),
    new ManifestPlugin(),
    // new HelloWorldPlugin(),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}