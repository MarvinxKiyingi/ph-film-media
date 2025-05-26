import { ImageIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const mediaType = defineType({
  name: 'mediaType',
  title: 'Image Type',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'media',
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
      title: 'media.alt',
      media: 'media',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image',
        media: media || ImageIcon,
      };
    },
  },
});
