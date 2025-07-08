import { ImageIcon, ListIcon, TextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const heroCarousel = defineType({
  name: 'heroCarousel',
  title: 'Hero Carousel',
  type: 'object',
  icon: ListIcon,
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
                  preview: {
                    select: {
                      title: 'infoItemTitle',
                    },
                    prepare({ title }) {
                      return {
                        title: title || 'No title',
                        media: TextIcon,
                      };
                    },
                  },
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
    prepare() {
      return {
        title: 'Hero Carousel',
        media: ListIcon,
      };
    },
  },
});
