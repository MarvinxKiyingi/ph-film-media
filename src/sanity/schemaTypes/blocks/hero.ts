import { ImageIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
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
              name: 'image',
              type: 'imageType',
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
              name: 'buttonLink',
              title: 'Button Link',
              type: 'linkType',
            },
            {
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              to: [{ type: 'page' }],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'mediaCard.content.title',
      media: 'mediaCard.content.image.imageType.image',
      updatedAt: '_updatedAt',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero',
        media: media || ImageIcon,
      };
    },
  },
});
