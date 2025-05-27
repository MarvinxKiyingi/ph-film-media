import { ImageIcon, TiersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const imageWithText = defineType({
  name: 'imageWithText',
  title: 'Image With Text',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'mediaItem',
      title: 'Media Item',
      type: 'mediaType',
    }),
    defineField({
      name: 'mediaTitle',
      title: 'Media Title',
      type: 'string',
    }),
    defineField({
      name: 'textSection',
      title: 'Text Section',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textItem',
          title: 'Text Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'richText',
              title: 'Rich Text',
              type: 'richText',
            }),
          ],
        },
        {
          type: 'object',
          name: 'servicesList',
          title: 'Services List',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'services',
              title: 'Services',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'services' }] }],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: title || 'Services List',
                media: TiersIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'mediaItem.media',
    },
    prepare({ media }) {
      return {
        title: 'Image With Text',

        media: media || ImageIcon,
      };
    },
  },
});
