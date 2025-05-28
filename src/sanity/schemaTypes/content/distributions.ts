import { PlayIcon, UserIcon, InlineElementIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const distributions = defineType({
  name: 'distributions',
  title: 'Distributions',
  type: 'document',
  icon: InlineElementIcon,
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
      title: 'Media (Bilder)',
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
      title: 'Release Date (Premiär)',
      description: 'The release date of the movie.',
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
      title: 'Director (Regissör)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'directorReference',
          title: 'Director Reference ',
          fields: [
            {
              name: 'directorItems',
              title: 'Director Items ',
              type: 'reference',
              to: [{ type: 'directors' }],
            },
          ],
          preview: {
            select: {
              title: 'directorItems.director',
            },
            prepare({ title }) {
              return {
                title: title || 'No director selected',
                media: UserIcon,
              };
            },
          },
        },
      ],
      group: 'text',
    }),
    defineField({
      name: 'writers',
      title: 'Writers (Skribenter)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'writerReference',
          title: 'Writer Reference',
          fields: [
            {
              name: 'writerItem',
              title: 'Writer Item',
              type: 'reference',
              to: [{ type: 'writers' }],
            },
          ],
          preview: {
            select: {
              title: 'writerItem.writer',
            },
            prepare({ title }) {
              return {
                title: title || 'No writer selected',
                media: UserIcon,
              };
            },
          },
        },
      ],
      group: 'text',
    }),
    defineField({
      name: 'actors',
      title: 'Actors (Medverkande)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'actorReference',
          title: 'Actor Reference',
          fields: [
            {
              name: 'actorItem',
              title: 'Actor Item',
              type: 'reference',
              to: [{ type: 'actors' }],
            },
          ],
          preview: {
            select: {
              title: 'actorItem.actor',
            },
            prepare({ title }) {
              return {
                title: title || 'No actor selected',
                media: UserIcon,
              };
            },
          },
        },
      ],
      group: 'text',
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
      name: 'movieBanner',
      title: 'Movie Banner',
      type: 'mediaType',
      group: 'media',
    }),
    defineField({
      name: 'moviePoster',
      title: 'Movie Poster',
      type: 'mediaType',
      group: 'media',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
      moviePoster: 'moviePoster.media',
      movieBanner: 'movieBanner.media',
    },
    prepare({ title, updatedAt, moviePoster, movieBanner }) {
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
        media: moviePoster ? moviePoster : movieBanner ? movieBanner : PlayIcon,
      };
    },
  },
});
