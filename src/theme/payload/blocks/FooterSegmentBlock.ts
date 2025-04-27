import { Block } from 'payload'

const FooterSegmentBlock: Block = {
  slug: 'footer_segment',
  interfaceName: 'FooterSegmentBlock',
  labels: {
    singular: 'Footer',
    plural: 'Footer',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}

export default FooterSegmentBlock
