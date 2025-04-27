import LinkBlock from '@/payload/blocks/LinkBlock'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

const GitHubSegmentBlock: Block = {
  slug: 'github_segment',
  interfaceName: 'GitHubSegmentBlock',
  labels: {
    singular: 'GitHub',
    plural: 'GitHub',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      required: false,
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

export default GitHubSegmentBlock
