import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'distributionSettings',
      title: 'Distribution Settings',
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'directorsLabel',
      title: 'Directors Label (Regissör titel)',
      description: 'This is used to display the directors label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),
    defineField({
      name: 'writersLabel',
      title: 'Writers Label (Skribent titel)',
      description: 'This is used to display the writers label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),

    defineField({
      name: 'actorsLabel',
      title: 'Actors Label (Medverkande titel)',
      description: 'This is used to display the actors label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),
    defineField({
      name: 'languagesLabel',
      title: 'Languages Label (Språk titel)',
      description: 'This is used to display the languages label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),
    defineField({
      name: 'releaseDateLabel',
      title: 'Release Date Label (Premiär titel)',
      description:
        'This is used to display the release date label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),
    defineField({
      name: 'durationLabel',
      title: 'Duration Label (Längd titel)',
      description: 'This is used to display the duration label in under the distribution movie.',
      type: 'string',
      group: 'distributionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      updatedAt: '_updatedAt',
    },
    prepare({title, updatedAt}) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet'

      return {
        title: title || 'Settings',
        subtitle: `Last edited: ${formattedDate}`,
      }
    },
  },
})
