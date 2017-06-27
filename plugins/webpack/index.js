var WebpackPlugin = exports

WebpackPlugin.name = 'webpack'

WebpackPlugin.attach = options => {
  var app = this
  var webpack = require('webpack')
  var webpackConfig = app.config.environment === 'development'
    ? require('./webpack.dev.conf')
    : require('./webpack.prod.conf')

  var compiler = webpack(webpackConfig)

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

  app.devMiddleware = devMiddleware
  app.hotMiddleware = hotMiddleware
}

WebpackPlugin.init = done => {
  done()
}
