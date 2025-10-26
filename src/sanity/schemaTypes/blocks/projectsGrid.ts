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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            showFeaturedProjectCard?: boolean;
          };
          if (parent?.showFeaturedProjectCard && !value) {
            return 'Project is required when Featured Project Card is shown.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'showSubstackPostsCard',
      title: 'Show Substack Posts Card',
      type: 'boolean',
      description: 'Enable to display Substack posts at the top of the grid.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      showFeaturedProjectCard: 'showFeaturedProjectCard',
      showSubstackPostsCard: 'showSubstackPostsCard',
    },
    prepare({ showFeaturedProjectCard, showSubstackPostsCard }) {
      return {
        title: 'Projects Grid',
        subtitle: `Featured: ${showFeaturedProjectCard ? '🟢' : '🔴'} | Substack: ${showSubstackPostsCard ? '🟢' : '🔴'}`,
        media: ThLargeIcon,
      };
    },
  },
});
