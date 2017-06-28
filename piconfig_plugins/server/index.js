var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')
var opn = require('opn')
var ora = require('ora')

var ServerPlugin = exports

ServerPlugin.name = 'server'

ServerPlugin.requires = ['config', 'webpack', 'asset_manager']

ServerPlugin.init = (app, { config, webpack, asset_manager }) => {
  var spinner = ora('Initializing server plugin')

  var env = (config.config.environment === 'production') ? 'server' : 'dev'
  var envConfig = config.config[env]
  var proxyTable = envConfig.proxyTable || {}

  var server = express()

  Object.keys(proxyTable).forEach(context => {
    var options = proxyTable[context]

    if (typeof options === 'string') {
      options = { target: options }
    }

    server.use(proxyMiddleware(options.filter || context, options))
  })

  server.use(connectHistoryApiFallback())

  if (config.config.environment !== 'production') {
    if (webpack.devMiddleware) {
      server.use(webpack.devMiddleware)
    }

    if (webpack.hotMiddleware) {
      server.use(webpack.hotMiddleware)
    }
  }

  Object.keys(asset_manager.staticAssets).forEach(staticPath => {
    var serverPath = asset_manager.staticAssets[staticPath]
    server.use(staticPath, express.static(serverPath))
  })

  var listenServer

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  var listen = () => {
    return new Promise((resolve, reject) => {
      var listenStart = () => {
        if (envConfig.autoOpenBrowser && config.config.environment !== 'testing') {
          var uri = 'http://' + envConfig.host + ':' + envConfig.port
          opn(uri)
        }

        _resolve()
      }

      if (config.config.environment !== 'production' && webpack.devMiddleware) {
        webpack.devMiddleware.waitUntilValid(listenStart)
      }

      listenServer = server.listen(envConfig.port || 88, envConfig.address || '0.0.0.0')

      if (config.config.environment === 'production' || !webpack.devMiddleware) {
        listenStart()
      }

      resolve()
    })
  }

  var close = () => {
    listenServer.close()
  }

  var plugin = {
    exports: {
      server: server,
      listen: listen,
      serverReady: readyPromise,
      close: close
    },
    servers: {
      'web server': listen
    }
  }

  spinner.succeed('Initialized server plugin')

  return plugin
}
