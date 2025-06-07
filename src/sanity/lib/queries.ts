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
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
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
          media{
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
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
        media{
          alt,
          crop,
          hotspot,
          asset->{
            _id,
            _ref,
            _type,
            _createdAt,
            _updatedAt,
            _rev,
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    },
    // Media Carousel Block
    _type == "mediaCarousel" => {
      _type,
      carouselItems[]{
        id,
        mediaItem{
          media{
            alt,
            crop,
            hotspot,  
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
          }
        },
        title
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
            media{
              alt,
              crop,
              hotspot,
              asset->{
                _id,
                _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
            }
          },
          movieBanner{
            media{
              alt,
              crop,
              hotspot,
              asset->{
                _id,
                _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
            }
          }
        }
      }
    },
    // Movie Hero Block
    _type == "movieHero" => {
      _type,
      mediaItems{
        media{
          alt,
          crop,
          hotspot,
          asset->{
            _id,
            _ref,
            _type,
            _createdAt,
            _updatedAt,
            _rev,
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    },
    // Image With Text Block
    _type == "imageWithText" => {
      _type,
      mediaItem{
        media{
          alt,
          crop,
          hotspot,
          asset->{
            _id,
            _ref,
            _type,
            _createdAt,
            _updatedAt,
            _rev,
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          }
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
          media{
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
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
            media{
              alt,
              crop,
              hotspot,
              asset->{
                _id,
                _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
            }
          },
          movieBanner{
            media{
              alt,
              crop,
              hotspot,
              asset->{
                _id,
                _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
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
        asset->{
          _id,
          _ref,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
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
            media{
              alt,
              crop,
              hotspot,
              asset->{
                  _id,
                  _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
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
          media{
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
          }
        }
      },
      // Media Carousel Block
      _type == "mediaCarousel" => {
        _type,
        carouselItems[]{
          id,
          mediaItem{
            media{
              alt,
              crop,
              hotspot,
                asset->{
                  _id,
                  _ref,
                  _type,
                  _createdAt,
                  _updatedAt,
                  _rev,
                  url,
                  metadata {
                    lqip,
                    dimensions {
                      width,
                      height
                    }
                  }
                }
            }
          },
          title
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
              media{
                alt,
                crop,
                hotspot,
                asset->{
                  _id,
                  _ref,
                  _type,
                  _createdAt,
                  _updatedAt,
                  _rev,
                  url,
                  metadata {
                    lqip,
                    dimensions {
                      width,
                      height
                    }
                  }
                }
              }
            },
            movieBanner{
              media{
                alt,
                crop,
                hotspot,
                asset->{
                    _id,
                    _ref,
                  _type,
                  _createdAt,
                  _updatedAt,
                  _rev,
                  url,
                  metadata {
                    lqip,
                    dimensions {
                      width,
                      height
                    }
                  }
                }
              }
            }
          }
        }
      },
      // Movie Hero Block
      _type == "movieHero" => {
        _type,
        mediaItems{
          media{
            alt,
            crop,
            hotspot,  
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
          }
        }
      },
      // Image With Text Block
      _type == "imageWithText" => {
        _type,
        mediaItem{
          media{
            alt,
            crop,
            hotspot,
            asset->{
              _id,
              _ref,
              _type,
              _createdAt,
              _updatedAt,
              _rev,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height
                }
              }
            }
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
            media{
              alt,
              crop,
              hotspot,
              asset->{
                _id,
                _ref,
                _type,
                _createdAt,
                _updatedAt,
                _rev,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height
                  }
                }
              }
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
              media{
                alt,
                crop,
                hotspot,
                asset->{
                  _id,
                  _ref,
                  _type,
                  _createdAt,
                  _updatedAt,
                  _rev,
                  url,
                  metadata {
                    lqip,
                    dimensions {
                      width,
                      height
                    }
                  }
                }
              }
            },
            movieBanner{
              media{
                alt,
                crop,
                hotspot,
                asset->{
                  _id,
                  _ref,
                  _type,
                  _createdAt,
                  _updatedAt,
                  _rev,
                  url,
                  metadata {
                    lqip,
                    dimensions {
                      width,
                      height
                    }
                  }
                }
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
          asset->{
            _id,
            _ref,
            _type,
            _createdAt,
            _updatedAt,
            _rev,
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          },
        }
      }
    }
  }
  `);
