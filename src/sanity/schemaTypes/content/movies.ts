import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const movies = defineType({
  name: 'movies',
  title: 'Movies',
  type: 'document',
  icon: PlayIcon,
  groups: [
    {
      name: 'text',
      title: 'Text',
    },
    {
      name: 'buttons',
      title: 'Buttons',
    },
    {
      name: 'media',
      title: 'Media',
    },
  ],
  fields: [
    // ----- Text -----
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'text',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      group: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
      group: 'text',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'languages' }] }],
      group: 'text',
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'directors' }] }],
      group: 'text',
    }),
    defineField({
      name: 'writers',
      title: 'Writers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'writers' }] }],
      group: 'text',
    }),
    defineField({
      name: 'actors',
      title: 'Actors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'actors' }] }],
      group: 'text',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'text',
      validation: (Rule) =>
        Rule.min(1).max(5).error('Rating must be between 1 and 5.'),
      description: 'Rating out of 5, 1 = 1 star, 5 = 5 stars',
    }),
    // ----- Buttons -----
    defineField({
      name: 'ticketLabel',
      title: 'Ticket Label',
      type: 'string',
      group: 'buttons',
    }),

    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'linkType',
      group: 'buttons',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      group: 'buttons',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'linkType',
      group: 'buttons',
    }),
    // ----- Media -----
    defineField({
      name: 'trailer',
      title: 'Trailer',
      type: 'linkType',
      group: 'media',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageType',
      group: 'media',
    }),
    defineField({
      name: 'moviePoster',
      title: 'Movie Poster',
      type: 'imageType',
      group: 'media',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
      moviePoster: 'moviePoster',
    },
    prepare({ title, updatedAt, moviePoster }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Movie',
        subtitle: `Last edited: ${formattedDate}`,
        media: moviePoster ? moviePoster : PlayIcon,
      };
    },
  },
});
