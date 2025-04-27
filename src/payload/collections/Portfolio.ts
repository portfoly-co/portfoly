import LinkBlock from '@/payload/blocks/LinkBlock'
import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolios',
  versions: true,
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Portfolios',
    singular: 'Portfolio',
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      required: false,
    },
    {
      name: 'links',
      type: 'blocks',
      blocks: [LinkBlock],
    },
  ],
}
