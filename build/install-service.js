var path = require('path')
var fs = require('fs')
var mustache = require('mustache')
var config = require('.../src/config')

async.waterfall([
  (callback) => {
    fs.readFile(path.resolve(__dirname, '../templates/systemd/pi-config.service.template'), (error, data) => {
      if (error) {
        callback(error)
      } else {
        callback(null, data.toString())
      }
    })
  },
  (template, callback) => {
    var output = mustache.render(template, {
      install_path: __dirname
    })

    callback(output)
  },
  (output, callback) => {
    fs.writeFile('/etc/systemd/system/pi-config.service', output, callback)
  }
], (error) => {
  if (error) {
    console.log('ERROR: Could not write service file. ' + error);
  } else {
    console.log('Installed pi-config.service file.')
    console.log('You can now run "systemctl start pi-config" and "systemctl enable pi-config" to start and enable the service.')
  }
})
