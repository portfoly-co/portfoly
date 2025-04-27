const fs = require('fs')

let payloadTypesFile = null

function payloadTypesFileSnapshot() {
  payloadTypesFile = fs.readFileSync('./src/payload-types.ts')
}

function payloadTypesFileRead() {
  return fs.readFileSync('./src/payload-types.ts')
}

function payloadTypesFileRevert() {
  fs.writeFileSync('./src/payload-types.ts', payloadTypesFile)
}

module.exports = { payloadTypesFileRead, payloadTypesFileSnapshot, payloadTypesFileRevert }
