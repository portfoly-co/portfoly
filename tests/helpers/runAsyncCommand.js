const { spawn } = require('child_process')

module.exports = function runAsyncCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args)
    let stdoutData = ''
    let stderrData = ''

    child.stdout.on('data', (data) => {
      stdoutData += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderrData += data.toString()
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData.trim())
      } else {
        reject(new Error(`Command failed with code ${code}:\n${stderrData.trim()}`))
      }
    })

    child.on('error', (err) => {
      reject(err)
    })
  })
}
