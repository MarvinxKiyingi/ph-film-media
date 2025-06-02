import type { Metadata, ResolvingMetadata } from 'next';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { fetchHome, fetchPage, settingsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import type {
  FetchHomeResult,
  SettingsQueryResult,
  FetchPageResult,
} from '../../sanity.types';

type Props = {
  params: Promise<{ slug: string }>;
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
  pageValue: T | undefined,
  settingsValue: T | undefined,
  fallback: T
): T {
  return pageValue ?? settingsValue ?? fallback;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const isHome = !slug || slug === '/';

  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';

  const settings = await client.fetch<SettingsQueryResult>(settingsQuery);
  const page = isHome
    ? await client.fetch<FetchHomeResult>(fetchHome, { slug: '/' })
    : await client.fetch<FetchPageResult>(fetchPage, { slug });

  const pageSeo = page?.seo;
  const settingsSeo = settings?.seo;

  // Title
  const titleFromPage = pageSeo?.metaTitle ?? page?.title;
  const fullTitle =
    titleFromPage && titleFromPage !== DEFAULT_TITLE
      ? `${titleFromPage} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;

  // Description
  const description =
    getSeoField(
      pageSeo?.metaDescription ?? undefined,
      settingsSeo?.metaDescription ?? undefined,
      DEFAULT_DESCRIPTION
    ) ?? DEFAULT_DESCRIPTION;

  // Image
  const image = pageSeo?.metaImage?.media || settingsSeo?.metaImage?.media;
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
        : `${baseUrl.replace(/\/$/, '')}/${slug.replace(/^\/+/, '')}`,
    },
    other: {
      'og:site_name': settingsSeo?.metaTitle || DEFAULT_TITLE,
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
