import '../globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { fetchFooter, fetchHeader } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { Oswald, Lato } from 'next/font/google';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['600'],
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await client.fetch(fetchHeader);
  const footer = await client.fetch(fetchFooter);
  return (
    <html lang='en'>
      <body
        className={`flex flex-col ${oswald.variable} ${lato.variable} antialiased`}
      >
        <Header data={header} />
        <main className='flex-1'>{children}</main>
        <Footer data={footer} />
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
