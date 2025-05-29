import { defineQuery } from 'next-sanity';

export const fetchAllPageSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const settingsQuery = defineQuery(`
    *[_type == "settings"][0]{
      _id,
      _type,
      seo {
        metaTitle,
        metaDescription,
        metaImage {
          media {
            _type,
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              _ref,
              _type,
            },
          }
        }
      },
      distributionMovieDetailTitles {
        directorsLabel,
        writersLabel,
        actorsLabel,
        languagesLabel,
        releaseDateLabel,
        durationLabel
      }
    }
    `);

export const fetchHeader = defineQuery(`
 *[_type == "header"][0]{
  linkReference[]{
    _key,
    _type,
    _id,
    // For internal links
    _type == "internalLink" => {
      linkLabel,
      page->{
        _id,
        title,
        slug
      }
    },
    // For external links
    _type == "externalLink" => {
      linkLabel,
      link{
        href
      }
    }
  },
  socialMediaLinks[]{
    href
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
      href
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
    metaTitle,
    metaDescription,
    metaImage {
      _type,
      media {
        _type,
        alt,
        crop,
        hotspot,
        asset->{
          _id,
          _ref,
          _type,
        },
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
      metaTitle,
      metaDescription,
      metaImage {
        _type,
        media {
          _type,
          alt,
          crop,
          hotspot,
          asset->{
            _id,
            _ref,
            _type,
          },
        }
      }
    }
  }
  `);
