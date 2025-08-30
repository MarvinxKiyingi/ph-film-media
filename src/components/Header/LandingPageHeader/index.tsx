'use client';
import LandingPageNavItems from '@/components/Header/LandingPageHeader/LandingPageNavItems';
import React from 'react';
import MobileMenuBar from '../MobileMenuBar/MobileMenuBar';
import BigLogo from '@/components/Blocks/HeroCarousel/BigLogo';
import { FetchHeaderResult } from '../../../../sanity.types';
import { useHeaderHeight } from './useHeaderHeight';

const LandingPageHeader = ({
  header,
  isLandingPage,
}: {
  header: FetchHeaderResult;
  isLandingPage: boolean;
}) => {
  const headerRef = useHeaderHeight();

  return (
    <nav
      ref={headerRef}
      className='max-lg:min-h-[51.48px] max-lg:mt-5 z-50 fixed lg:relative lg:px-p-desktop lg:pt-6'
      role='navigation'
      aria-label='Main menu'
    >
      <BigLogo />
      <div className='z-50 lg:py-5 lg:top-0 lg:w-full'>
        <MobileMenuBar header={header} />
        <LandingPageNavItems isLandingPage={isLandingPage} header={header} />
      </div>
    </nav>
  );
};

export default LandingPageHeader;
