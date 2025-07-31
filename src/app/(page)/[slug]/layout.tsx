import '@/app/globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { fetchFooter } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: footer } = await sanityFetch({ query: fetchFooter });

  return (
    <>
      <Header />
      {children}
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
