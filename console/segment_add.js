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
  let slug = name.toLowerCase()

  blockData = blockData.replaceAll('[(slug)]', slug)
  blockData = blockData.replaceAll('[(name)]', name)
  blockData = blockData.replaceAll('[(segmentName)]', segmentName)
  blockData = blockData.replaceAll('[(blockName)]', blockName)

  fs.writeFileSync('./src/theme/payload/blocks/' + blockName + '.ts', blockData)

  let segmentData = fs.readFileSync('./portfoly/bin/segment_template.stud', 'utf8')

  segmentData = segmentData.replaceAll('[(componentName)]', componentName)
  segmentData = segmentData.replaceAll('[(blockName)]', blockName)

  fs.writeFileSync('./src/theme/views/segments/' + slug + '_segment.tsx', segmentData)

  console.log('\x1b[42m\x1b[37mDone.\x1b[0m')

  process.exit(0)
}

main()
