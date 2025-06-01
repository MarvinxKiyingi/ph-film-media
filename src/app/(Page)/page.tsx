import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { fetchAllPageSlugs, fetchHome } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { generateMetadata } from '@/utils/generateMetadata';
import { FetchHomeResult } from '../../../sanity.types';
import Hero from '@/components/Hero/Hero';

export { generateMetadata };

type BlockListItem = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number];

export async function generateStaticParams() {
  const slugs = await client.fetch(fetchAllPageSlugs);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const data: FetchHomeResult = await client.fetch(
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

  if (!data) return null;

  return (
    <div
      className={`flex flex-col min-h-svh lg:min-h-screen pt-52 ${data.blockList?.[0]._type === 'hero' ? 'lg:pt-0' : 'lg:pt-48'}`}
    >
      {data.blockList?.map((block: BlockListItem, idx: number) => {
        if (block._type === 'hero') {
          return (
            <Hero
              key={idx}
              block={block}
              idx={idx}
              blockLength={data.blockList?.length || 0}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
