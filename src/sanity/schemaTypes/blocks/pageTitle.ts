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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'No title',
        subtitle: 'Page Title Override',
      };
    },
  },
});
