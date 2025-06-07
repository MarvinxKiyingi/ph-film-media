import '@/app/globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { fetchFooter } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footer = await client.fetch(fetchFooter);

  return (
    <>
      <Header />
      <main className='flex flex-col flex-1 lg:mt-[var(--header-height-desktop)]'>
        {children}
      </main>
      <Footer footer={footer} />

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
