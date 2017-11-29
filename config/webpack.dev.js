const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const paths = require('./paths')

module.exports = merge(common, {
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:7798',
    // 'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: "../dist",
    publicPath: '/',
    port: 7798,
    // hot: true
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
            // options: {
            //   modules: true,
            //   localIdentName: '[path][name]__[local]--[hash:base64:5]'
            // }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('precss')
              ]
            }
          }
          
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
})