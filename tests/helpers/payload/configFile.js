const fs = require('fs')

let configFile = null

function configFileSnapshot() {
  configFile = fs.readFileSync('./src/theme/config.ts')
}

function configFileRead() {
  return fs.readFileSync('./src/theme/config.ts')
}

function configFileRevert() {
  fs.writeFileSync('./src/theme/config.ts', configFile)
}

module.exports = { configFileRead, configFileSnapshot, configFileRevert }
