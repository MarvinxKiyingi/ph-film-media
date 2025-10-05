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
        <h1 className='lg:flex lg:col-span-1'>
          <Link
            href='/'
            className='w-fit'
            aria-current='page'
            aria-label='homepage | PH Film & Media'
          >
            {mobileLogo && showMobileLogo && (
              <div className='lg:hidden'>
                <SanityImage
                  {...mobileLogo}
                  className='max-h-full w-auto object-contain'
                  aspectRatio='4/5'
                />
              </div>
            )}
            {desktopLogo && showDesktopLogo && (
              <div className='hidden lg:block'>
                <SanityImage
                  {...desktopLogo}
                  className='max-h-full lg:max-h-12 w-auto object-contain'
                  aspectRatio='4/5'
                />
              </div>
            )}
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='lg:flex lg:col-span-1 w-fit'
          aria-label='PH Film & Media homepage'
        >
          {mobileLogo && showMobileLogo && (
            <div className='lg:hidden'>
              <SanityImage
                {...mobileLogo}
                className='max-h-full w-auto object-contain'
                aspectRatio='4/5'
              />
            </div>
          )}
          {desktopLogo && showDesktopLogo && (
            <div className='hidden lg:block'>
              <SanityImage
                {...desktopLogo}
                className='max-h-full lg:max-h-12 w-auto object-contain'
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
