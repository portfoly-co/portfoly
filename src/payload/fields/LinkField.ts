import { Field } from 'payload'

const LinkField: Field = {
  name: 'link',
  type: 'group',
  label: 'Link',
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      defaultValue: 'external',
      options: [
        {
          label: 'Internal',
          value: 'internal',
        },
        {
          label: 'External',
          value: 'external',
        },
        {
          label: 'E-Mail',
          value: 'email',
        },
        {
          label: 'Phone',
          value: 'phone',
        },
      ],
    },
  ],
}

export default LinkField
