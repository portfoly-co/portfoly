const runAsyncCommand = require('../helpers/runAsyncCommand')
const fs = require('fs')

const {
  payloadTypesFileRevert,
  payloadTypesFileSnapshot,
  payloadTypesFileRead,
} = require('../helpers/payload/payloadTypesFile')
const {
  configFileSnapshot,
  configFileRevert,
  configFileRead,
} = require('../helpers/payload/configFile')

describe('segment:add', () => {
  beforeAll(() => {
    payloadTypesFileSnapshot()
    configFileSnapshot()
    if (fs.existsSync('./src/theme/payload/blocks/TestSegmentBlock.ts')) {
      fs.unlinkSync('./src/theme/payload/blocks/TestSegmentBlock.ts')
    }

    if (fs.existsSync('./src/theme/views/segments/test_segment.tsx')) {
      fs.unlinkSync('./src/theme/views/segments/test_segment.tsx')
    }
  })

  afterAll(() => {
    payloadTypesFileRevert()
    configFileRevert()

    if (fs.existsSync('./src/theme/payload/blocks/TestSegmentBlock.ts')) {
      fs.unlinkSync('./src/theme/payload/blocks/TestSegmentBlock.ts')
    }

    if (fs.existsSync('./src/theme/views/segments/test_segment.tsx')) {
      fs.unlinkSync('./src/theme/views/segments/test_segment.tsx')
    }
  })
  test('segment:add creates required files', async () => {
    const oldPayloadTypes = payloadTypesFileRead()
    const oldConfigFile = configFileRead()
    await runAsyncCommand('node', ['./console/segment_add.js', 'test'])
    expect(fs.existsSync('./src/theme/payload/blocks/TestSegmentBlock.ts')).toBe(true)
    expect(fs.existsSync('./src/theme/views/segments/test_segment.tsx')).toBe(true)
    const block_file = fs.readFileSync('./src/theme/payload/blocks/TestSegmentBlock.ts', 'utf-8')
    expect(oldConfigFile).not.toBe(configFileRead())
    expect(oldPayloadTypes).not.toBe(payloadTypesFileRead())
    expect(block_file).toContain('test_segment')
  })
})
