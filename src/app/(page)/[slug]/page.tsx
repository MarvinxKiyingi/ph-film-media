import { sanityFetch } from '@/sanity/lib/live';
import { fetchPage, fetchFooter } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import BlockRenderer from '@/components/PageBuilder/BlockRenderer';
import type {
  FetchPageResult,
  FetchFooterResult,
} from '../../../../sanity.types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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

  const { data: footer }: { data: FetchFooterResult } = await sanityFetch({
    query: fetchFooter,
  });

  return (
    <>
      <Header />
      <main
        className='grid grid-cols-1 max-lg:pt-[22%] mt-[var(--header-height-mobile)] lg:mt-0 lg:col-span-10 lg:row-span-full lg:overflow-y-scroll lg:py-p-desktop'
        id='page-main-content'
      >
        {data.blockList?.map((block, idx) => {
          if (!('_type' in block)) return null;
          return (
            <BlockRenderer
              key={'_key' in block ? block._key : idx}
              block={block}
              index={idx}
              slug={data.slug || undefined}
              className='grid grid-cols-1'
            />
          );
        })}
        <Footer footer={footer} />
      </main>
    </>
  );
}
