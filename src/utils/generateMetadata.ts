import type { Metadata, ResolvingMetadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { urlForImage } from '@/sanity/lib/utils';
import { FetchHomeResult, FetchPageResult, Settings } from '../../sanity.types';
import { settingsQuery } from '@/sanity/lib/queries';

// You may want to import your fetchPage query if you want to fetch page data by slug
// import { fetchPage } from '@/sanity/lib/queries';

type PageData = FetchHomeResult | FetchPageResult;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  await params;

  // Fetch settings
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  // Fetch page data if slug is provided (implement your actual fetchPage logic here)
  const page: PageData | null = null;

  // Title and description logic
  const pageTyped = page as FetchHomeResult | FetchPageResult | null;
  const settingsTyped = settings as Settings | null;
  const pageSeo = pageTyped?.seo;
  const settingsSeo = settingsTyped?.seo;

  const pageTitle =
    page && typeof page === 'object' && 'title' in page
      ? (page as FetchHomeResult | FetchPageResult)?.title
      : undefined;
  const title =
    pageSeo?.metaTitle ??
    pageTitle ??
    settingsSeo?.metaTitle ??
    'PH Film & Media';

  const fullTitle =
    pageSeo?.metaTitle && settingsSeo?.metaTitle
      ? `${pageSeo.metaTitle} | ${settingsSeo.metaTitle}`
      : pageTitle && settingsSeo?.metaTitle
        ? `${pageTitle} | ${settingsSeo.metaTitle}`
        : title;

  const description =
    pageSeo?.metaDescription ??
    settingsSeo?.metaDescription ??
    'Default description';

  // Image logic
  const imageUrl =
    urlForImage(pageSeo?.metaImage ?? settingsSeo?.metaImage)?.url() ??
    'https://your-default-image.png';
  // Optionally extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: fullTitle,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
        'http://localhost:3000'
    ),
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
        'http://localhost:3000',
    },
    other: {
      'og:site_name': settings?.seo?.metaTitle || 'PH Film & Media',
      'og:locale': 'en_US',
      'og:type': 'website',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      'og:image:secure_url': imageUrl,
      'og:image:type': 'image/jpeg',
    },
  };
}
