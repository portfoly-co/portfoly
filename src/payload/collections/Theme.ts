import config from '@/theme/config'
import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Theme: CollectionConfig = {
  slug: 'themes',
  labels: {
    plural: 'Themes',
    singular: 'Theme',
  },
  admin: {
    useAsTitle: 'name',
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
      name: 'active',
      type: 'checkbox',
    },
    {
      name: 'portfolio',
      type: 'relationship',
      relationTo: 'portfolios',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: config.blocks,
    },
  ],
}
