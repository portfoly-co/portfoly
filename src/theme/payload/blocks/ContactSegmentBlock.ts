import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

const ContactSegmentBlock: Block = {
  slug: 'contact_segment',
  interfaceName: 'ContactSegmentBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contact',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}

export default ContactSegmentBlock
