import type { Metadata, ResolvingMetadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { urlForImage } from '@/sanity/lib/utils';
import { FetchHomeResult, FetchPageResult } from '../../sanity.types';
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
  const { data: settingsData } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  // Fetch page data if slug is provided (implement your actual fetchPage logic here)
  const page: PageData | null = null;

  function hasTitle(obj: unknown): obj is { title: string | null } {
    return !!obj && typeof obj === 'object' && 'title' in obj;
  }
  let title: string = 'PH Film & Media';
  if (page && typeof page === 'object') {
    const pageWithSeo = page as FetchHomeResult | FetchPageResult | null;
    if (pageWithSeo && pageWithSeo.seo && pageWithSeo.seo.title) {
      title = pageWithSeo.seo.title;
    } else if (pageWithSeo && hasTitle(pageWithSeo) && pageWithSeo.title) {
      title = pageWithSeo.title;
    } else if (settingsData?.title) {
      title = settingsData.title;
    }
  } else if (settingsData?.title) {
    title = settingsData.title;
  }
  let description: string = 'Default description';
  if (page && typeof page === 'object') {
    const pageWithSeo = page as FetchHomeResult | FetchPageResult | null;
    if (pageWithSeo && pageWithSeo.seo && pageWithSeo.seo.description) {
      description = pageWithSeo.seo.description;
    } else if (settingsData?.description) {
      description = settingsData.description;
    }
  } else if (settingsData?.description) {
    description = settingsData.description;
  }

  // Image logic
  let imageUrl = '';
  if (page && typeof page === 'object') {
    const pageWithSeo = page as FetchHomeResult | FetchPageResult | null;
    if (pageWithSeo && pageWithSeo.seo && pageWithSeo.seo.image) {
      imageUrl = urlForImage(pageWithSeo.seo.image)?.url() ?? '';
    } else if (settingsData?.image) {
      imageUrl = urlForImage(settingsData.image)?.url() ?? '';
    }
  } else if (settingsData?.image) {
    imageUrl = urlForImage(settingsData.image)?.url() ?? '';
  }

  // Optionally extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description,
    openGraph: {
      title: title,
      description,
      images: imageUrl ? [imageUrl, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}
