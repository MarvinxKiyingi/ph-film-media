import { TextIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const pageTitle = defineType({
  name: 'pageTitle',
  title: 'Page Title',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'If no title is provided, the page title will be used',
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'visibilityType',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      visibility: 'visibility',
    },
    prepare({ title, visibility }) {
      return {
        title: title || 'No title',
        media: TextIcon,
        subtitle: visibility
          ? `Visible on - Mobile: ${visibility.hideOnMobile ? '🔴' : '🟢'} | Desktop: ${visibility.hideOnDesktop ? '🔴' : '🟢'}`
          : 'Visible on - Mobile: 🟢 | Desktop: 🟢',
      };
    },
  },
});
