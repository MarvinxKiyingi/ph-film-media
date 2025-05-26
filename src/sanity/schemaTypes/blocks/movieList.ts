import { ListIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const movieList = defineType({
  name: 'movieList',
  title: 'Movie List',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'movies',
      title: 'Movies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'movie',
          title: 'Movie',
          fields: [
            {
              name: 'movie',
              title: 'Movie',
              type: 'reference',
              to: [{ type: 'movies' }],
            },
          ],
          preview: {
            select: {
              title: 'movie.title',
              media: 'movie.image.media',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'movies.0.movie.image.media',
    },
    prepare({ media }) {
      return {
        title: 'Movie List',

        media: media || ListIcon,
      };
    },
  },
});
