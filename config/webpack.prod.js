const merge = require('webpack-merge');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HelloWorldPlugin = require('../src/HelloWorldPlugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const paths = require('./paths')

// const extractAntCss = new ExtractTextPlugin('static/css/ant.[contenthash:8].css')

module.exports = merge(common, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            'postcss-loader'
            // {
            //   loader: require.resolve('postcss-loader'),
            //   options: {
            //     ident: 'postcss',
            //     plugins: () => [
            //       require('postcss-flexbugs-fixes'),
            //       require('precss'),
            //       autoprefixer({
            //         browsers: [
            //           '>1%',
            //           'last 4 versions',
            //           'Firefox ESR',
            //           'not ie < 9',
            //         ],
            //         flexbox: 'no-2009',
            //       }),
            //     ],
            //   },
            // },
          ]
        })
      },
      // {
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {root: path.join(__dirname, '../'), verbose: true}),
    new ExtractTextPlugin("styles.css"),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new HtmlWebpackPlugin({
      title: 'production',
      template: paths.appHtml,
      favicon: paths.favicon
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