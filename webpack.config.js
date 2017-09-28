const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HelloWorldPlugin = require('./src/HelloWorldPlugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 7798
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ] 
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, './dist/index.html')
    }),
    // new HelloWorldPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}