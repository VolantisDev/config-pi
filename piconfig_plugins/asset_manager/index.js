var path = require('path')
var ora = require('ora')

var AssetManagerPlugin = exports

AssetManagerPlugin.name = 'asset_manager'

AssetManagerPlugin.requires = ['config']

AssetManagerPlugin.init = (app, { config }) => {
  var spinner = ora('Initializing asset_manager plugin')

  var envConfig = config.config[config.config.configEnv]
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

  spinner.succeed('Initialized asset_manager plugin')

  return plugin
}
