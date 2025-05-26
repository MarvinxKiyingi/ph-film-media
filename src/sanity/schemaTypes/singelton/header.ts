import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkReference',
      title: 'Link Reference',
      type: 'array',
      of: [
        {
          name: 'internalLink',
          title: 'Internal Link',
          type: 'object',
          description: 'Used to link to an existing page',
          fields: [
            {
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
            },
          ],
        },
        {
          type: 'object',
          name: 'externalLink',
          title: 'External Link',
          description: 'Used to override the default label for the page',
          fields: [
            {
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'linkType',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'linkReference.0.internalLink.0.page.title',
      media: 'linkReference.0.internalLink.0.page.mediaItems.0.image',
      updatedAt: '_updatedAt',
    },
    prepare({ title, media, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';
      return {
        title: title || 'Navigation',
        subtitle: `Last edited: ${formattedDate}`,
        media: media || LinkIcon,
      };
    },
  },
});
