import type { Metadata, ResolvingMetadata } from 'next';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import {
  fetchHome,
  fetchPage,
  settingsQuery,
  fetchDistributionMovie,
} from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

type RichTextBlock = {
  children?: Array<{ text?: string }>;
  _type?: string;
  _key?: string;
};

type Props = {
  params: Promise<{ slug: string; movieSlug?: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
const DEFAULT_TITLE = 'PH Film & Media';
const DEFAULT_DESCRIPTION = 'Default description';
const DEFAULT_IMAGE_URL = '/images/default-image.png';
const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 630;

const DEFAULT_IMAGE = {
  url: DEFAULT_IMAGE_URL,
  alt: 'Page',
  width: DEFAULT_IMAGE_WIDTH,
  height: DEFAULT_IMAGE_HEIGHT,
};

function getSeoField<T>(
  distributionMovie: T | undefined,
  pageValue: T | undefined,
  settingsValue: T | undefined,
  fallback: T
): T {
  return distributionMovie ?? pageValue ?? settingsValue ?? fallback;
}

function getDescriptionText(
  description: string | RichTextBlock[] | undefined | null
): string {
  if (typeof description === 'string') return description;
  if (!description || !Array.isArray(description) || description.length === 0)
    return DEFAULT_DESCRIPTION;

  const first = description[0];
  if (first?.children?.[0]?.text) return first.children[0].text;
  return DEFAULT_DESCRIPTION;
}

function truncateDescription(text: string): string {
  if (text.length <= 155) return text;
  return text.slice(0, 152) + '...';
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, movieSlug } = await params;
  const isHome = !slug || slug === '/';
  const isDistributionMovie = slug && movieSlug;

  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';

  // Handle regular pages
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  const { data: page } = isHome
    ? await sanityFetch({ query: fetchHome, params: { slug: '/' } })
    : await sanityFetch({ query: fetchPage, params: { slug } });

  // Handle distribution movie pages
  const { data: movie } = isDistributionMovie
    ? await sanityFetch({
        query: fetchDistributionMovie,
        params: { slug: movieSlug },
      })
    : { data: undefined };

  const pageSeo = page?.seo;
  const settingsSeo = settings?.seo;

  // Title
  const titleFromPage =
    movie?.title || pageSeo?.metaTitle || page?.pageTitle || DEFAULT_TITLE;
  const fullTitle =
    titleFromPage && titleFromPage !== DEFAULT_TITLE
      ? `${titleFromPage} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;

  // Description
  const movieDescription = movie?.description
    ? getDescriptionText(movie.description)
    : undefined;
  const pageDescription = pageSeo?.metaDescription || undefined;
  const settingsDescription = settingsSeo?.metaDescription || undefined;

  const description = truncateDescription(
    getSeoField(
      movieDescription,
      pageDescription,
      settingsDescription,
      DEFAULT_DESCRIPTION
    )
  );

  // Image
  const image =
    movie?.movieBanner?.media ||
    movie?.moviePoster?.media ||
    pageSeo?.metaImage?.media ||
    settingsSeo?.metaImage?.media;
  const ogImage =
    resolveOpenGraphImage(image, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT) ||
    DEFAULT_IMAGE;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [ogImage, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isHome
        ? `${baseUrl.replace(/\/$/, '')}/`
        : isDistributionMovie
          ? `${baseUrl.replace(/\/$/, '')}/${slug}/${movieSlug}`
          : `${baseUrl.replace(/\/$/, '')}/${slug.replace(/^\/+/, '')}`,
    },
    other: {
      'og:site_name':
        movie?.title ||
        page?.pageTitle ||
        settingsSeo?.metaTitle ||
        settings?.seo?.metaTitle ||
        DEFAULT_TITLE,
      'og:locale': 'en_US',
      'og:type': 'website',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': ogImage.alt,
      'og:image:secure_url': ogImage.url,
      'og:image:type': 'image/jpeg',
    },
  };
}
