import { ListIcon, PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const movieClubList = defineType({
  name: 'movieClubList',
  title: 'Movie Club List',
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
              to: [{ type: 'movieClub' }],
            },
          ],
          preview: {
            select: {
              title: 'movie.title',
              movieBanner: 'movie.movieBanner.media',
            },
            prepare({ title, movieBanner }) {
              return {
                title: title || 'No movie selected',
                media: movieBanner ? movieBanner : PlayIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      movieBanner: 'movies.0.movie.movieBanner.media',
    },
    prepare({ movieBanner }) {
      return {
        title: 'Movie List',
        media: movieBanner ? movieBanner : ListIcon,
      };
    },
  },
});
