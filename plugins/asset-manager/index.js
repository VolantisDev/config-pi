var path = require('path')

var AssetManagerPlugin = exports

AssetManagerPlugin.name = 'AssetManager'

AssetManagerPlugin.requires = ['Config']

AssetManagerPlugin.init = (app, { Config }) => {
  app.bootstrap.pluginSpinner.text = 'Attaching AssetManager plugin'

  var envConfig = Config.config[Config.config.environment]
  var staticPath = path.posix.join(envConfig.assetsPublicPath, envConfig.assetsSubDirectory)

  var staticAssets = {}
  staticAssets[staticPath] = path.resolve(__dirname, '../../static')

  var plugin = {
    exports: {
      staticAssets: staticAssets
    },
    hooks: {
      staticAssets (pluginName, pluginAssets) {
        pluginAssets.forEach((assetPath, staticPath) => {
          staticAssets[staticPath] = assetPath
        })
      }
    }
  }

  return plugin
}
