var path = require('path')

var AssetManagerPlugin = exports

AssetManagerPlugin.name = 'assetManager'

AssetManagerPlugin.attach = options => {
  var app = this
  var config = app.config[app.config.environment]
  var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)

  var assets = {}
  assets[staticPath] = path.resolve(__dirname, '../../static')

  app.assets = assets
}

AssetManagerPlugin.init = done => {
  done()
}
