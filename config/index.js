var configLoader = require('../core/config-loader')
var path = require('path')

var config = configLoader.loadConfig(path.resolve(__dirname, 'config.js'))
configLoader.mergeIni(config, '/etc/pi-config/config')

module.exports = config
