const Promise = require('bluebird')
const fs = require('fs-extra')
const path = require('path')
const systemd = Promise.promisify(require('strong-service-systemd'))
const systemctl = require('systemctl')

var serviceDefaults = {
  user: 'root',
  group: 'root',
  execpath: '/usr/bin/node',
  template: path.resolve(__dirname, '../templates/systemd.service.jst')
}

var SystemdPlugin = module.exports

SystemdPlugin.name = 'Systemd'

SystemdPlugin.init = (app) => {
  app.bootstrap.pluginSpinner.text = 'Attaching Systemd plugin'

  return {
    exports: {
      add: add,
      remove: remove,
      enable: enable,
      disable: disable,
      start: start,
      stop: stop,
      restart: restart,
      isEnabled: isEnabled,
      daemonReload: daemonReload
    }
  }
}

function servicePath (name) {
  return '/etc/systemd/system/' + name + '.service'
}

function add (name, config) {
  return new Promise((resolve, reject) => {
    systemd(Object.assign({name: name}, serviceDefaults, config))
      .then((service) => {
        return fs.writeFile(servicePath(name), service)
      })
      .then(resolve)
      .catch((error) => {
        throw error
      })
  })
}

function remove (name) {
  return fs.remove(servicePath(name))
}

function enable (name) {
  return systemctl.enable(name)
}

function disable (name) {
  return systemctl.disable(name)
}

function start (name) {
  return systemctl.start(name)
}

function stop (name) {
  return systemctl.stop(name)
}

function restart (name) {
  return systemctl.restart(name)
}

function isEnabled (name) {
  return systemctl.isEnabled(name)
}

function daemonReload () {
  return systemctl.daemonReload()
}
