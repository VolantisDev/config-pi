var configLoader = require('../core/config-loader')

var config = configLoader.loadConfig('./config.js')
configLoader.mergeIni(config, '/etc/pi-config/config')

module.exports = config
