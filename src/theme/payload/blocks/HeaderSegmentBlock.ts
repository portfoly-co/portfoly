import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import LinkBlock from '../../../payload/blocks/LinkBlock'

const HeaderSegmentBlock: Block = {
  slug: 'header_segment',
  interfaceName: 'HeaderSegmentBlock',
  labels: {
    singular: 'Header',
    plural: 'Header',
  },
  fields: [
    {
      name: 'greeting',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'about',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      labels: {
        singular: 'Call to action',
        plural: 'Call to actions',
      },
      label: 'Call to action',
      name: 'call_to_action',
      type: 'blocks',
      blocks: [LinkBlock],
      maxRows: 1,
    },
  ],
}

export default HeaderSegmentBlock
