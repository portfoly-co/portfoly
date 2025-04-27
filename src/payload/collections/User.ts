import type { CollectionConfig } from 'payload'

export const User: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    plural: 'Users',
    singular: 'User',
  },
  auth: true,
  fields: [],
}
