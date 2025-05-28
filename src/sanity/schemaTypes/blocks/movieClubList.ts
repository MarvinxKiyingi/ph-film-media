import {ListIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
              to: [{type: 'movieClub'}],
            },
          ],
          preview: {
            select: {
              title: 'movie.title',
              moviePoster: 'movie.moviePoster.media',
              movieBanner: 'movie.movieBanner.media',
            },
            prepare({title, moviePoster, movieBanner}) {
              return {
                title: title || 'No movie selected',
                media: moviePoster ? moviePoster : movieBanner ? movieBanner : ListIcon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      moviePoster: 'movies.0.movie.moviePoster.media',
      movieBanner: 'movies.0.movie.movieBanner.media',
    },
    prepare({moviePoster, movieBanner}) {
      return {
        title: 'Movie List',
        media: moviePoster ? moviePoster : movieBanner ? movieBanner : ListIcon,
      }
    },
  },
})
