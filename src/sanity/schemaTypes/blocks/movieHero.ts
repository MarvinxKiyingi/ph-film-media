import { ImageIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const movieHero = defineType({
  name: 'movieHero',
  title: 'Movie Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'imageType',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mediaItems.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Movie Hero',
        media: media || ImageIcon,
      };
    },
  },
});
