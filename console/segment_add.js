import { spawn } from 'child_process'
import fs from 'fs'

const main = async () => {
  let name = process.argv[2]

  if (!name) {
    console.error('Name required')
  }

  let blockData = fs.readFileSync('./portfoly/bin/block_template.stud', 'utf8')

  name = name[0].toUpperCase() + name.slice(1)
  const segmentName = name + 'Segment'
  const blockName = segmentName + 'Block'
  const componentName = segmentName + 'Component'
  let slug = name.toLowerCase() + '_segment'

  blockData = blockData.replaceAll('[(slug)]', slug)
  blockData = blockData.replaceAll('[(name)]', name)
  blockData = blockData.replaceAll('[(segmentName)]', segmentName)
  blockData = blockData.replaceAll('[(blockName)]', blockName)

  fs.writeFileSync('./src/theme/payload/blocks/' + blockName + '.ts', blockData)

  let configData = fs.readFileSync('./src/theme/config.ts', 'utf8')

  if (!configData.includes(blockName)) {
    let splittedConfig = configData.split('blocks: [')
    let newConfig = 'import ' + blockName + " from './payload/blocks/" + blockName + "'\n"
    newConfig += splittedConfig[0] + 'blocks: [\n\t\t' + blockName + ',' + splittedConfig[1]

    fs.writeFileSync('./src/theme/config.ts', newConfig)
  }

  await payloadGenerateTypes()

  let segmentData = fs.readFileSync('./portfoly/bin/segment_template.stud', 'utf8')

  segmentData = segmentData.replaceAll('[(componentName)]', componentName)
  segmentData = segmentData.replaceAll('[(blockName)]', blockName)

  fs.writeFileSync('./src/theme/views/segments/' + slug + '.tsx', segmentData)

  console.log('\x1b[42m\x1b[37mDone.\x1b[0m')

  process.exit(0)
}

function payloadGenerateTypes() {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['./node_modules/payload/bin.js', 'generate:types'])
    let stdoutData = ''
    let stderrData = ''

    child.stdout.on('data', (data) => {
      stdoutData += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderrData += data.toString()
    })

    child.on('close', (code) => {
      console.log(`Child process exited with code ${code}`)
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

main()
