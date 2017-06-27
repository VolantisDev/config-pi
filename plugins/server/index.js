var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')
var opn = require('opn')

var ServerPlugin = exports

ServerPlugin.name = 'server'

ServerPlugin.attach = options => {
  var app = this
  var env = (app.config.environment === 'production') ? 'server' : 'dev'
  var config = app.config[env]
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

  if (app.config.environment !== 'production') {
    if (app.devMiddleware) {
      server.use(app.devMiddleware)
    }

    if (app.hotMiddleware) {
      server.use(app.hotMiddleware)
    }
  }

  Object.keys(app.assets).forEach(staticPath => {
    var serverPath = app.assets[staticPath]
    server.use(staticPath, express.static(serverPath))
  })

  app.server = server

  var listenServer

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  app.listen = () => {
    var listenStart = () => {
      if (config.autoOpenBrowser && app.config.environment !== 'testing') {
        var uri = 'http://' + config.host + ':' + config.port
        opn(uri)
      }

      _resolve()
    }

    if (app.config.environment !== 'production' && app.devMiddleware) {
      app.devMiddleware.waitUntilValid(listenStart)
    }

    listenServer = server.listen(config.port || 88, config.address || '0.0.0.0')

    if (app.config.environment === 'production' || !app.devMiddleware) {
      listenStart()
    }
  }

  app.serverReady = readyPromise

  app.closeServer = () => {
    listenServer.close()
  }
}

ServerPlugin.init = done => {
  done()
}
