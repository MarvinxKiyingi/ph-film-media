import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const linkType = defineType({
  name: 'linkType',
  title: 'Link Type',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      description: 'Add an external link, that opens a new tab in the browser',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto'],
          allowRelative: false,
        }).error('Please enter a valid external URL or mailto link.'),
    }),
  ],
  preview: {
    select: {
      title: 'href',
      updatedAt: '_updatedAt',
    },
    prepare({ title, updatedAt }) {
      return {
        title: title || 'href',
        subtitle: `Last edited: ${updatedAt}`,
      };
    },
  },
});
