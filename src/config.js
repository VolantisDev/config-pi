var path = require('path')
var fs = require('fs')
var flatconfig = require('flatconfig')

var configFilePath = '/etc/pi-config/config'
var config = flatconfig.load(path.resolve(__dirname, '../config'))
if (fs.existsSync(configFilePath)) {
  flatconfig.join.ini(config, configFilePath)
}

module.exports = config
