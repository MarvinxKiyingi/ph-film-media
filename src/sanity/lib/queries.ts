import { defineQuery } from 'next-sanity';
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    title,
    description,
    image {
      _type,
      asset
    }
  }
  `);
export const fetchHome = defineQuery(`
*[_type == "page" && slug.current == '/'][0]{
  _id,
  title,
  slug,
  blockList[],
  seo {
    title,
    description,
    image {
      asset->{
        _id,
        url
      }
    }
  }
}
`);
export const fetchPage = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    blockList[],
    seo {
      title,
      description,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
  `);
