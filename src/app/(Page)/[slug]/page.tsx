import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { fetchAllPageSlugs, fetchPage } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { token } from '@/sanity/lib/token';
import { generateMetadata } from '@/utils/generateMetadata';

// Define the new Props type for Next.js 15
// params and searchParams are Promises
// searchParams is included for completeness, but not used here

type PageParams = Promise<{ slug: string }>;

export { generateMetadata };

export async function generateStaticParams() {
  const slugs = await client.fetch(fetchAllPageSlugs);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: { params: PageParams }) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const data = await client.fetch(
    fetchPage,
    { slug },
    isEnabled
      ? {
          perspective: 'previewDrafts',
          useCdn: false,
          stega: true,
          token: token,
        }
      : undefined
  );
  if (!data) {
    notFound();
  }
  return <h1>{data?.title || 'Page'}</h1>;
}
