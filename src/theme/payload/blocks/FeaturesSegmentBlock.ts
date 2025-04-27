import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

const FeaturesSegmentBlock: Block = {
  slug: 'features_segment',
  interfaceName: 'FeaturesSegmentBlock',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          index: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor(),
          required: true,
        },
      ],
    },
  ],
}

export default FeaturesSegmentBlock
