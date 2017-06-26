var checkVersions = require('./check-versions')
var opn = require('opn')
var ora = require('ora')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')

module.exports = (environment) => {
  checkVersions()

  var config = require('../src/config/' + environment + '.env.js')
  var port = process.env.PORT || config.port
  var address = config.listenAddress || '0.0.0.0'
  var autoOpenBrowser = !!config.autoOpenBrowser
  var useWebpack = !!config.useWebpack
  var host = config.host || 'localhost'
  var uri = 'http://' + host + ':' + port

  // https://github.com/chimurai/http-proxy-middleware
  var proxyTable = config.proxyTable

  const spinner = ora('Starting ' + environment + ' server')

  var app = express()

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(connectHistoryApiFallback())

  if (useWebpack) {
    var webpack = require('webpack')
    var webpackConfig = process.env.NODE_ENV === 'dev'
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
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)
  }

  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  var listenStart = () => {
    spinner.succeed('Listening at ' + address + ':' + port)

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    _resolve()
  };

  if (useWebpack) {
    devMiddleware.waitUntilValid(listenStart)
  } else {
    listenStart()
  }

  var server = app.listen(port)

  return {
    ready: readyPromise,
    close: () => {
      server.close()
    }
  }
};
