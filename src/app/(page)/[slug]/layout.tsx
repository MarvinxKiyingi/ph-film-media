import '@/app/globals.css';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { fetchFooter } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import type { FetchFooterResult } from '../../../../sanity.types';

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: footer }: { data: FetchFooterResult } = await sanityFetch({
    query: fetchFooter,
  });

  return (
    <>
      <Header />
      {children}
      <Footer footer={footer} />
    </>
  );
}
