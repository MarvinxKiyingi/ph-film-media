import { ThLargeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const projectsGrid = defineType({
  name: 'projectsGrid',
  title: 'Projects Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'showFeaturedProjectCard',
      title: 'Show Featured Project Card',
      type: 'boolean',
      description:
        'Enable to display a highlighted featured project at the top of the grid.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      showFeaturedProjectCard: 'showFeaturedProjectCard',
    },
    prepare({ showFeaturedProjectCard }) {
      return {
        title: 'Projects Grid',
        subtitle: `Featured card: ${showFeaturedProjectCard ? 'Enabled 🟢' : 'Disabled 🔴'}`,
        media: ThLargeIcon,
      };
    },
  },
});
