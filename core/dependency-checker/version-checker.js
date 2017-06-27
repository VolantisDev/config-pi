var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../../package.json')
var shell = require('shelljs')
var childProcess = require('child_process')
var ora = require('ora')

function exec (cmd) {
  return childProcess.execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = () => {
  var warnings = []
  var i
  var spinner = ora('Requirement version check started').start()

  for (i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    spinner.fail('Requirement versions do not match')
    console.log('')
    console.log(chalk.yellow('To use this application, you must update the following modules:'))
    console.log()
    for (i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  } else {
    spinner.succeed('Requirement version check successful')
  }
}
