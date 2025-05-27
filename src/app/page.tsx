import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { fetchHome } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { generateMetadata } from '@/utils/generateMetadata';

export { generateMetadata };

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const data = await client.fetch(
    fetchHome,
    { slug: '/' },
    isEnabled
      ? {
          perspective: 'previewDrafts',
          useCdn: false,
          stega: true,
          token: token,
        }
      : undefined
  );
  return <h1>{data?.title || 'Home'}</h1>;
}
