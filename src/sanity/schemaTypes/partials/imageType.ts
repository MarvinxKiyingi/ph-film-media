import { ImageIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const imageType = defineType({
  name: 'imageType',
  title: 'Image Type',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true, metadata: ['lqip'] },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image',
        media: media || ImageIcon,
      };
    },
  },
});
