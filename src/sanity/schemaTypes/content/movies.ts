import { PlayIcon, ListIcon, UserIcon } from '@sanity/icons';
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
      of: [
        {
          type: 'object',
          name: 'directorReference',
          title: 'Director Reference',
          fields: [
            {
              name: 'directorItems',
              title: 'Director Items',
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
        {
          type: 'object',
          name: 'customDirectorText',
          title: 'Custom Director Text',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'richText',
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              // text is an array of blocks; get the first block's children text
              if (Array.isArray(text) && text.length > 0 && text[0].children) {
                const plain = text[0].children
                  .map((child: { text: string }) => child.text)
                  .join('');
                return {
                  title: plain || 'No director selected',
                  media: ListIcon,
                };
              }
              return {
                title: 'No director selected',
                media: ListIcon,
              };
            },
          },
        },
      ],
      group: 'text',
    }),
    defineField({
      name: 'writers',
      title: 'Writers',
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
        {
          type: 'object',
          name: 'customWriterText',
          title: 'Custom Writer Text',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'richText',
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              if (Array.isArray(text) && text.length > 0 && text[0].children) {
                const plain = text[0].children
                  .map((child: { text: string }) => child.text)
                  .join('');
                return {
                  title: plain || 'No writer selected',
                  media: ListIcon,
                };
              }
              return {
                title: 'No writer selected',
                media: ListIcon,
              };
            },
          },
        },
      ],
      group: 'text',
    }),
    defineField({
      name: 'actors',
      title: 'Actors',
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
        {
          type: 'object',
          name: 'customActorText',
          title: 'Custom Actor Text',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'richText',
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              if (Array.isArray(text) && text.length > 0 && text[0].children) {
                const plain = text[0].children
                  .map((child: { text: string }) => child.text)
                  .join('');
                return {
                  title: plain || 'No actor selected',
                  media: ListIcon,
                };
              }
              return {
                title: 'No actor selected',
                media: ListIcon,
              };
            },
          },
        },
      ],
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
