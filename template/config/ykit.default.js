module.exports = {
  plugins: [],
  config: {
    exports: [
      './js/bigview.runtime.js'
    ],
    modifyWebpackConfig: function (baseConfig) {
      // edit ykit's Webpack configs
      return baseConfig
    }
  }
}
