const merge = require('webpack-merge');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HelloWorldPlugin = require('../src/HelloWorldPlugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'
    // }),
    new HtmlWebpackPlugin({
      title: 'development'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ManifestPlugin(),
    new HelloWorldPlugin(),
    // new BundleAnalyzerPlugin()
  ]
});