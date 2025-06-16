import '@/app/globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { token } from '@/sanity/lib/token';
import { fetchFooter, fetchHome } from '@/sanity/lib/queries';
import { FetchHomeResult } from '../../../sanity.types';
import { client } from '@/sanity/lib/client';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const footer = await client.fetch(fetchFooter);
  const hasMultipleBlocks = (data?.blockList?.length || 0) > 1;

  return (
    <>
      <Header />
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
