import { DoubleChevronDownIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: DoubleChevronDownIcon,
  groups: [
    {
      name: 'text',
      title: 'Text',
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'text',
    }),

    defineField({
      name: 'text',
      type: 'richText',
      description: 'The text to display underneath the title.',
      group: 'text',
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      description: 'The links to the social media pages.',
      group: 'socialMedia',
      type: 'array',
      of: [{ type: 'linkType' }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'text',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          name: 'serviceReference',
          title: 'Service Reference',
          fields: [
            {
              name: 'serviceItems',
              title: 'Service Items',
              type: 'reference',
              to: [{ type: 'services' }],
            },
          ],
          preview: {
            select: {
              title: 'serviceItems.service',
            },
            prepare({ title }) {
              return {
                title: title || 'No service selected',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'customServiceLabel',
          title: 'Custom Service Label',
          description: 'Custom services label. ',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return {
                title: title || 'No label',
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: 'rights',
      title: 'Rights',
      type: 'string',
      description: 'The rights text to display in the footer.',
      group: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
    },
    prepare({ title, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Footer',
        subtitle: `Last edited: ${formattedDate}`,
        media: DoubleChevronDownIcon,
      };
    },
  },
});
