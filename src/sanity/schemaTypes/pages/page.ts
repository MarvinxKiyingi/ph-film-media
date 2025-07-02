import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import * as blocks from '../blocks';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description:
        'This is used to create a URL for the page. If the page is the home page, the slug is /',
      options: {
        source: 'pageTitle',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blockList',
      type: 'array',
      of: Object.values(blocks).map((block) => ({
        type: block.name,
      })),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      media: 'blockList.0.mediaCard.content.image.mediaType.image',
      updatedAt: '_updatedAt',
    },
    prepare(selection) {
      const { title, updatedAt, media } = selection;
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';
      return {
        title: title || 'Page',
        media: media || DocumentTextIcon,
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
