const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "../dist",
    port: 7798,
    // publicPath: "http://localhost:7798/assets/"  //决定开发环境的js在哪个目录,推荐与输出的目录相同
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
})