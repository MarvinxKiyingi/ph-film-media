import { sanityFetch } from '@/sanity/lib/live';
import { fetchPage } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import BlockRenderer from '@/components/PageBuilder/BlockRenderer';
import type { FetchPageResult } from '../../../../sanity.types';

export { generateMetadata };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data }: { data: FetchPageResult } = await sanityFetch({
    query: fetchPage,
    params: { slug },
  });

  if (!data) {
    notFound();
  }

  return (
    <main
      id='page-main-content'
      className='flex flex-col flex-1 pt-[20vh] mt-[var(--header-height-mobile)] lg:mt-[var(--header-height-desktop)]'
    >
      <div className='grid grid-cols-1'>
        {data.blockList?.map((block, idx) => {
          if (!('_type' in block)) return null;
          return (
            <BlockRenderer
              key={'_key' in block ? block._key : idx}
              block={block}
              index={idx}
              slug={data.slug || undefined}
            />
          );
        })}
      </div>
    </main>
  );
}
