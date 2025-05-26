import { DoubleChevronDownIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: DoubleChevronDownIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'richText',
      description: 'The text to display underneath the title.',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerShortText',
          title: 'Footer Short Text',
          fields: [
            {
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'services' }],
            },
          ],
        },
        {
          type: 'object',
          name: 'footerShortTextCustom',
          title: 'Footer Short Text Custom',
          description: 'Custom services short text short. ',
          fields: [
            {
              name: 'shortText',
              title: 'Short Text',
              type: 'string',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'rights',
      title: 'Rights',
      type: 'string',
      description: 'The rights text to display in the footer.',
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
