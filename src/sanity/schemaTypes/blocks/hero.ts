import { ImagesIcon, ImageIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'mediaCard',
      title: 'Media Card',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'content',
          title: 'Content',
          fields: [
            {
              name: 'cardImage',
              type: 'mediaType',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'infoItems',
              title: 'Info Items',
              description:
                'Add info items to the media card, to highlight the title',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'infoItem',
                  title: 'Info Item',
                  fields: [
                    {
                      name: 'infoItemTitle',
                      title: 'Info Item Title',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              name: 'buttonLabel',
              title: 'Button Label',
              type: 'string',
            },
            {
              name: 'internalButtonLink',
              title: 'Button Link (Internal)',
              type: 'reference',
              to: [{ type: 'page' }],
            },
            {
              name: 'externalButtonLink',
              title: 'Button Link (External)',
              type: 'linkType',
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'cardImage.media',
            },
            prepare({ title, media }) {
              return {
                title: title || 'No title',
                media: media || ImageIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'mediaType',
    }),
  ],
  preview: {
    select: {
      media: 'mediaCard.0.cardImage.media',
    },
    prepare({ media }) {
      return {
        title: 'Hero',
        media: media || ImageIcon,
      };
    },
  },
});
