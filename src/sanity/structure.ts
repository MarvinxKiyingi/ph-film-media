import type { StructureBuilder, StructureResolver } from 'sanity/structure';

// Schema imports

import * as content from './schemaTypes/content';
import * as singelton from './schemaTypes/singelton';

const contentSchemas = Object.values(content);
const singletonSchemas = Object.values(singelton);

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('PH Film & Media')
    .items([
      // Pages
      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      // Content
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items(
              contentSchemas.map((schema) =>
                S.documentTypeListItem(schema.name).title(
                  schema.title || schema.name
                )
              )
            )
        ),

      S.divider(),

      // Global singletons
      ...singletonSchemas.map((schema) =>
        S.listItem()
          .title(schema.title || schema.name)
          .child(S.document().schemaType(schema.name).documentId(schema.name))
          .icon(schema.icon || undefined)
      ),
    ]);
