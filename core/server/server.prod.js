var dependencyChecker = require('../dependency-checker')
var ora = require('ora')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')

module.exports = () => {
  // @ todo Abstract this so most of the module can be reused
  var config = require('../../config')['server']
  var environment = 'production'

  var port = process.env.PORT || config.port
  var address = config.listenAddress || '0.0.0.0'
  var host = config.host || 'localhost'
  var uri = 'http://' + host + ':' + port
  // https://github.com/chimurai/http-proxy-middleware
  var proxyTable = config.proxyTable

  const spinner = ora('Checking dependencies')
  dependencyChecker.check()

  spinner.text = 'Starting ' + environment + ' server'
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

  // serve pure static assets
  var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  var listenStart = () => {
    spinner.succeed('Listening at ' + uri)
    _resolve()
  }

  listenStart()

  var server = app.listen(port, address)

  return {
    ready: readyPromise,
    close: () => {
      server.close()
    }
  }
}
