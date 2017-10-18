const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge({
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "../dist",
    port: 7798,
    publicPath: "http://localhost:7798/assets/"  //决定开发环境的js在哪个目录,推荐与输出的目录相同
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
})