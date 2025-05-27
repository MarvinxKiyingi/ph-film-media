import { TiersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      validation: (Rule) => Rule.required().error('Service name is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'service',
      updatedAt: '_updatedAt',
    },
    prepare({ title, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Service',
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
