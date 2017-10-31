const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const paths = require('./paths')

process.env.PUBLIC_URL = ''

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: "../dist",
    publicPath: '/',
    port: 7798,
    // publicPath: "http://localhost:7798/assets/"  //决定开发环境的js在哪个目录,推荐与输出的目录相同
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: paths.appHtml,
      favicon: paths.favicon
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
})