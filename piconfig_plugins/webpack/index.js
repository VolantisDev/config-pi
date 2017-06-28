var ora = require('ora')

var WebpackPlugin = exports

WebpackPlugin.name = 'webpack'

WebpackPlugin.requires = ['config']

WebpackPlugin.init = (app, { config }) => {
  var spinner = ora('Initializing webpack plugin')

  var webpack = require('webpack')
  var webpackConfig = config.config.environment === 'development'
    ? require('./webpack.dev.conf')
    : require('./webpack.prod.conf')

  var compiler = webpack(webpackConfig)

  var properties = {}

  if (config.config.environment !== 'production') {
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
    })

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
          action: 'reload'
        })
        cb()
      })
    })

    properties.devMiddleware = devMiddleware
    properties.hotMiddleware = hotMiddleware
  }

  spinner.succeed('Initialized webpack plugin')

  return {
    exports: properties
  }
}
