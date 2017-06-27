var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')
var opn = require('opn')

var ServerPlugin = exports

ServerPlugin.name = 'Server'

ServerPlugin.requires = ['Config', 'Webpack', 'AssetManager']

ServerPlugin.init = (app, { Config, Webpack, AssetManager }) => {
  app.bootstrap.pluginSpinner.text = 'Attaching Server plugin'

  var env = (Config.config.environment === 'production') ? 'server' : 'dev'
  var config = Config.config[env]
  var proxyTable = config.proxyTable || {}

  var server = express()

  Object.keys(proxyTable).forEach(context => {
    var options = proxyTable[context]

    if (typeof options === 'string') {
      options = { target: options }
    }

    server.use(proxyMiddleware(options.filter || context, options))
  })

  server.use(connectHistoryApiFallback())

  if (Config.config.environment !== 'production') {
    if (Webpack.devMiddleware) {
      server.use(Webpack.devMiddleware)
    }

    if (Webpack.hotMiddleware) {
      server.use(Webpack.hotMiddleware)
    }
  }

  Object.keys(AssetManager.staticAssets).forEach(staticPath => {
    var serverPath = AssetManager.staticAssets[staticPath]
    server.use(staticPath, express.static(serverPath))
  })

  var listenServer

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  var listen = () => {
    var listenStart = () => {
      if (config.autoOpenBrowser && Config.config.environment !== 'testing') {
        var uri = 'http://' + config.host + ':' + config.port
        opn(uri)
      }

      _resolve()
    }

    if (Config.config.environment !== 'production' && Webpack.devMiddleware) {
      Webpack.devMiddleware.waitUntilValid(listenStart)
    }

    listenServer = server.listen(config.port || 88, config.address || '0.0.0.0')

    if (Config.config.environment === 'production' || !Webpack.devMiddleware) {
      listenStart()
    }
  }

  var close = () => {
    listenServer.close()
  }

  return {
    exports: {
      server: server,
      listen: listen,
      serverReady: readyPromise,
      close: close
    }
  }
}
