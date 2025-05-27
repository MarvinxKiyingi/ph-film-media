import * as pages from './pages';
import * as blocks from './blocks';
import * as content from './content';
import * as partials from './partials';
import * as singelton from './singelton';

// Converting them into arrays
const allPages = Object.values(pages);
const allBlocks = Object.values(blocks);
const allContent = Object.values(content);
const allPartials = Object.values(partials);
const allSingelton = Object.values(singelton);

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schema = {
  types: [
    // Objects
    ...allPages,
    // Objects
    ...allBlocks,
    // Documents
    ...allContent,
    // Partials
    ...allPartials,
    // Partials
    ...allSingelton,
  ],
};
