import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Image: CollectionConfig = {
  slug: 'images',
  labels: {
    plural: 'Images',
    singular: 'Image',
  },
  access: {
    read: () => true,
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
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: true,
}
