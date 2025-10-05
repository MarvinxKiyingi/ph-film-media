'use client';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import SanityImage from '@/components/Media/SanityImage';
import type { FetchHeaderResult } from '../../../sanity.types';

type HeaderLogoProps = {
  header: FetchHeaderResult | null;
};

const HeaderLogo = ({ header }: HeaderLogoProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const mobileLogo = header?.mobileLogo;
  const desktopLogo = header?.desktopLogo;

  if (!mobileLogo && !desktopLogo) return null;

  return (
    <>
      {isHome ? (
        <h1 className='lg:flex lg:col-span-1'>
          <Link
            href='/'
            className='w-fit'
            aria-current='page'
            aria-label='homepage | PH Film & Media'
          >
            {mobileLogo && (
              <SanityImage
                {...mobileLogo}
                className='max-h-full w-auto object-contain lg:hidden lg:max-h-12'
                aspectRatio='16/9'
                mode='cover'
              />
            )}
            {desktopLogo && (
              <SanityImage
                {...desktopLogo}
                className='max-h-full w-auto object-contain max-lg:hidden lg:max-h-12'
                aspectRatio='16/9'
                mode='cover'
              />
            )}
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='lg:flex lg:col-span-1 w-fit'
          aria-label='PH Film & Media homepage'
        >
          {mobileLogo && (
            <SanityImage
              {...mobileLogo}
              className='max-h-full w-auto object-contain lg:hidden lg:max-h-12'
              aspectRatio='16/9'
              mode='cover'
            />
          )}
          {desktopLogo && (
            <SanityImage
              {...desktopLogo}
              className='max-h-full w-auto object-contain max-lg:hidden lg:max-h-12'
              aspectRatio='16/9'
              mode='cover'
            />
          )}
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
