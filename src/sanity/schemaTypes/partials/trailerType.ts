import { defineField, defineType } from 'sanity';

export const trailerType = defineType({
  name: 'trailerType',
  title: 'Trailer Type',
  type: 'object',
  fields: [
    defineField({
      name: 'trailerLinkLabel',
      title: 'Trailer Link Label',
      type: 'string',
      initialValue: 'Trailer',
    }),
    defineField({
      name: 'trailerLink',
      title: 'Trailer Link',
      type: 'linkType',
    }),
  ],
  preview: {
    select: {
      trailerLinkLabel: 'trailerLinkLabel',
    },
    prepare({ trailerLinkLabel }) {
      return {
        title: trailerLinkLabel || 'No link selected',
      };
    },
  },
});
