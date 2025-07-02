import { ListIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const distributionList = defineType({
  name: 'distributionList',
  title: 'Distribution List',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'movies',
      title: 'Movies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'distributions' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'movies.0.title',
      moviePoster: 'movies.0.moviePoster.media',
      movieBanner: 'movies.0.movieBanner.media',
    },
    prepare({ title, moviePoster, movieBanner }) {
      return {
        title: title || 'Movie List',
        media: moviePoster ? moviePoster : movieBanner ? movieBanner : ListIcon,
      };
    },
  },
});
