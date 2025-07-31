import '@/app/globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { fetchFooter, fetchHome } from '@/sanity/lib/queries';
import { FetchHomeResult } from '../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/live';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data }: { data: FetchHomeResult } = await sanityFetch({
    query: fetchHome,
    params: { slug: '/' },
  });

  const { data: footer } = await sanityFetch({ query: fetchFooter });
  const hasMultipleBlocks = (data?.blockList?.length || 0) > 1;

  return (
    <>
      <Header isLandingPage />
      <main className='flex flex-col flex-1 mt-[var(--header-height-mobile)] lg:mt-0'>
        {children}
      </main>
      <Footer footer={footer} hasMultipleBlocks={hasMultipleBlocks} />

      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
