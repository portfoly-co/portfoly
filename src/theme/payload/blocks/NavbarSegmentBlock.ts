import { Block } from 'payload'
import LinkBlock from '../../../payload/blocks/LinkBlock'

const NavbarSegmentBlock: Block = {
  slug: 'navbar_segment',
  interfaceName: 'NavbarSegmentBlock',
  labels: {
    singular: 'Navbar',
    plural: 'Navbar',
  },
  fields: [
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

export default NavbarSegmentBlock
