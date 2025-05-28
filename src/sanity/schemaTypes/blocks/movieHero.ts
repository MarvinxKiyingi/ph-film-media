import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const movieHero = defineType({
  name: 'movieHero',
  title: 'Movie Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'mediaType',
    }),
  ],
  preview: {
    select: {
      media: 'mediaItems.image',
    },
    prepare({media}) {
      return {
        title: 'Movie Hero',
        media: media || ImageIcon,
      }
    },
  },
})
