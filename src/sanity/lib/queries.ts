import { defineQuery } from 'next-sanity';
export const settingsQuery = defineQuery(`
    *[_type == "settings"][0]{
      _id,
      _type,
      title,
      description,
      image {
        _type,
        _id,
        asset
      }
    }
    `);

export const fetchHeader = defineQuery(`
 *[_type == "header"][0]{
   _id,
   _type,
  linkReference[]{
    _key,
    _type,
    _id,
    // For internal links
    _type == "internalLink" => {
      _type,
      page->{
        _id,
        _type,
        title,
        slug
      }
    },
    // For external links
    _type == "externalLink" => {
      _type,
      linkLabel,
      link{
        _type,
        _id,
        href
      }
    }
  },
  socialMediaLinks[]{
    _key,
    _type,
    _id,
    href,
    title
  }
}
`);
export const fetchFooter = defineQuery(`
  *[_type == "footer"][0]{
    _id,
    _type,
    title,
    text[],
    socialMediaLinks[]{
      _key,
      _type,
      _id,
      href,
    },
    services[]{
      _key,
      _type,
      _id,
      // For serviceReference
      _type == "serviceReference" => {
        _type,
        _id,
        serviceItems->{
          _id,
          _type,
          service
        }
      },
      // For customServiceLabel
      _type == "customServiceLabel" => {
        _type,
        _id,
        label
      }
    },
    rights
  }
`);

export const fetchHome = defineQuery(`
*[_type == "page" && slug.current == '/'][0]{
  _id,
  _type,
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
    _type,
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
