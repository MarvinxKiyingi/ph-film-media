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
    defineField({
      name: 'featuredProjectCardOverride',
      title: 'Featured Project Card override (Optional)',
      description:
        'Choose a project to override the featured project card with. If no project is selected, the featured project card will display the latest project added to the grid.',
      type: 'reference',
      to: [{ type: 'projects' }],
      hidden: ({ parent }) => !parent?.showFeaturedProjectCard,
    }),
  ],
  preview: {
    select: {
      showFeaturedProjectCard: 'showFeaturedProjectCard',
    },
    prepare({ showFeaturedProjectCard }) {
      return {
        title: 'Projects Grid',
        subtitle: `Featured Card: ${showFeaturedProjectCard ? '🟢' : '🔴'}`,
        media: ThLargeIcon,
      };
    },
  },
});
