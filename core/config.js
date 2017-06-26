import path from 'path'
import fs from 'fs'
import flatconfig from 'flatconfig'

var configFilePath = '/etc/pi-config/config'
var config = flatconfig.load(path.resolve(__dirname, '../config'))

if (fs.existsSync(configFilePath)) {
  flatconfig.join.ini(config, configFilePath)
}

export default config
