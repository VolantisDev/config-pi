var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var path = require('path')
var systemd = Promise.promisify(require('strong-service-systemd'))
var pluginManager = require('./plugin-manager')

var defaults = {
  user: 'root',
  group: 'root',
  execpath: '/usr/bin/node',
  template: path.resolve(__dirname, '../templates/systemd.service.jst')
}

var installDir = path.resolve(__dirname, '../')

var services = {
  'pi-config': Object.assign(defaults, {
    description: 'Pi Config API',
    author: 'Ben McClure <ben.mcclure@gmail.com>',
    cwd: installDir,
    script: installDir + '/server.js'
  })
}

module.exports = {
  getServices: getServices,
  install: install,
  installAll: installAll
}

function getServices () {
  return new Promise((resolve, reject) => {
    pluginManager.bootstrap()
      .then((app) => {
        // @todo merge services from plugins
        resolve(services)
      })
      .catch(reject)
  })
}

function install (name, config) {
  return new Promise((resolve, reject) => {
    systemd(Object.assign({name: name}, defaults, config))
      .then((service) => {
        return fs.writeFileAsync('/etc/systemd/system/' + name + '.service', service)
      })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

function installAll () {
  return new Promise((resolve, reject) => {
    getServices()
      .then((services) => {
        // @todo Loop through services and ensure each one is installed
      })
      .catch(reject)
  })
}
