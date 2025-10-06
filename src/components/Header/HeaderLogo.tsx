'use client';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import SanityImage from '@/components/Media/SanityImage';
import type { FetchHeaderResult } from '../../../sanity.types';

type HeaderLogoProps = {
  header: FetchHeaderResult | null;
  variant?: 'mobile' | 'desktop' | 'both';
};

const HeaderLogo = ({ header, variant = 'both' }: HeaderLogoProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const mobileLogo = header?.mobileLogo;
  const desktopLogo = header?.desktopLogo;

  if (!mobileLogo && !desktopLogo) return null;

  // Determine which logos to show based on variant
  const showMobileLogo = variant === 'mobile' || variant === 'both';
  const showDesktopLogo = variant === 'desktop' || variant === 'both';

  return (
    <>
      {isHome ? (
        <h1 className='lg:flex lg:col-span-full lg:row-span-1'>
          <Link
            href='/'
            className='w-full'
            aria-current='page'
            aria-label='homepage | PH Film & Media'
          >
            {mobileLogo && showMobileLogo && (
              <div className='w-fit lg:hidden'>
                <SanityImage
                  {...mobileLogo}
                  className='max-h-full w-auto object-contain'
                  aspectRatio='4/5'
                />
              </div>
            )}
            {desktopLogo && showDesktopLogo && (
              <div className='w-full h-full hidden lg:block'>
                <SanityImage
                  {...desktopLogo}
                  className='max-h-full w-auto object-contain'
                  aspectRatio='4/5'
                />
              </div>
            )}
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='lg:flex w-full lg:col-span-full lg:row-span-1'
          aria-label='PH Film & Media homepage'
        >
          {mobileLogo && showMobileLogo && (
            <div className='w-fit lg:hidden'>
              <SanityImage
                {...mobileLogo}
                className='max-h-full w-auto object-contain'
                aspectRatio='4/5'
              />
            </div>
          )}
          {desktopLogo && showDesktopLogo && (
            <div className='w-full h-full hidden lg:block'>
              <SanityImage
                {...desktopLogo}
                className='max-h-full w-auto object-contain'
                aspectRatio='4/5'
              />
            </div>
          )}
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
