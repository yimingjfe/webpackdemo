module.exports = {
  plugins: [
      require('precss'),
      require('postcss-cssnext')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
        flexbox: 'no-2009',
      }),
      require('postcss-flexbugs-fixes')
  ]
}