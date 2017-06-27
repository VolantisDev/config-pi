var utils = require('./utils')
var config = require('../../config')
var isProduction = config.environment === 'production'

module.exports = {
  extractCSS: isProduction,
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
