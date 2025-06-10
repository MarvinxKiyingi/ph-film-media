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
          _type,
          media {
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
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
    id,
    _key,
    _type,
    _id,
    // For internal links
    _type == "internalLink" => {
      linkLabel,
      page->{
        _id,
        pageTitle,
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
  homeMenuItemLabel,
  socialMediaLinks[]{
    _key,
    _type,
    _id,
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
    pageTitle,
    slug,
    blockList[]{
      // Page Title Block
      _type == "pageTitle" => {
        _type,
        title
      },
      // Hero Block
      _type == "hero" => {
        _type,
        mediaCard[]{
          id,
          cardImage{
            _type,
            media{
              _type,
              alt,
              crop,
              hotspot,
              asset->{ ... }
            }
          },
          title,
          infoItems[]{
            id,
            infoItemTitle
          },
          buttonLabel,
          internalButtonLink->{_id, title, slug},
          externalButtonLink{href}
        },
        logo{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        }
      },
    // Media Carousel Block
    _type == "mediaCarousel" => {
      _type,
      carouselItems[]{
        title,
        mediaItem{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        },
      }
    },
      // Movie Club List Block
      _type == "movieClubList" => {
        _type,
        movies[]{
          id,
          movie->{
            _id,
            title,
            moviePoster{
              _type,
              media{
                _type,
                alt,
                crop,
                hotspot,
                asset->{ ... }
              }
            },
            movieBanner{
              _type,
              media{
                _type,
                alt,
                crop,
                hotspot,
                asset->{ ... }
              }
            }
          }
        }
      },
      // Movie Hero Block
      _type == "movieHero" => {
        _type,
        mediaItems{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,  
            asset->{ ... }
          }
        }
      },
      // Image With Text Block
      _type == "imageWithText" => {
        _type,
        mediaItem{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        },
        mediaTitle,
        textSection[]{
          id,
          title,
          richText
        }
      },
      // Logo Carousel Block
      _type == "logoCarousel" => {
        _type,
        logoItems[]{
          id,
          mediaItem{
            _type,
            media{
              _type,
              alt,
              crop,
              hotspot,
              asset->{ ... }
            }
          }
        }
      },
      // Distribution List Block
      _type == "distributionList" => {
        _type,
        movies[]{
          id,
          movie->{
            _id,
            title,
            moviePoster{
              _type,
              media{
                _type,
                alt,
                crop,
                hotspot,
                asset->{ ... }
              }
            },
            movieBanner{
              _type,
              media{
                _type,
                alt,
                crop,
                hotspot,
                asset->{ ... }
              }
            }
          }
        }
      }
    },
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
          asset->{ ... }
        }
      }
    }
  }
`);

export const fetchPage = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    pageTitle,
    slug,
    blockList[]{
      // Page Title Block
      _type == "pageTitle" => {
        _type,
        title
      },
      // Hero Block
      _type == "hero" => {
        _type,
        mediaCard[]{
          id,
          cardImage{
            _type,
            media{
              _type,
              alt,
              crop,
              hotspot,
              asset->{ ... }
            }
          },
          title,
          infoItems[]{
            id,
            infoItemTitle
          },
          buttonLabel,
          internalButtonLink->{_id, title, slug},
          externalButtonLink{href}
        },
        logo{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        }
      },
    // Media Carousel Block
    _type == "mediaCarousel" => {
      _type,
      carouselItems[]{
        title,
        mediaItem{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        },
      }
    },
      // Movie Club List Block
      _type == "movieClubList" => {
        _type,
        movies[]{
          id,
          movie->{
            _id,
            title,
            movieBanner{
              _type,
              media{
                _type,
                alt,
                crop,
                hotspot,
                asset->{ ... }
              }
            }
          }
        }
      },
      // Movie Hero Block
      _type == "movieHero" => {
        _type,
        mediaItems{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,  
            asset->{ ... }
          }
        }
      },
      // Image With Text Block
      _type == "imageWithText" => {
        _type,
        mediaItem{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        },
        mediaTitle,
        textSection[]{
          id,
          title,
          richText
        }
      },
      // Logo Carousel Block
      _type == "logoCarousel" => {
        _type,
        logoItems[]{
          id,
          mediaItem{
            _type,
            media{
              _type,
              alt,
              crop,
              hotspot,
              asset->{ ... }
            }
          }
        }
      },
      // Distribution List Block
      _type == "distributionList" => {
        _type,
        movies[]->{
        _id,
        title,
        releaseDate,
        description,
        duration,
        languages[]->{
          _id,
          language
        },
        directors[]->{
          _id,
          director
        },
        writers[]->{
          _id,
          writer
        },
        actors[]->{
          _id,
          actor
        },
        ticket,
        button,
        trailer,
        moviePoster{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        },
        movieBanner{
          _type,
          media{
            _type,
            alt,
            crop,
            hotspot,
            asset->{ ... }
          }
        }
      }
      }
    },
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
          asset->{ ... }
        }
      }
    }
  }
  `);
