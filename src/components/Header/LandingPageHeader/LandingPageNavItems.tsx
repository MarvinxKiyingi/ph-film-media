import React from 'react';
import DesktopMenuBar from '@/components/Header/DesktopMenuBar';
import { FetchHeaderResult } from '../../../../sanity.types';

type ILandingPageNavItems = {
  isLandingPage: boolean;
  header: FetchHeaderResult;
};

const LandingPageNavItems = ({
  isLandingPage,
  header,
}: ILandingPageNavItems) => {
  if (!header) return null;

  return (
    <div className='flex'>
      <DesktopMenuBar
        header={header}
        isLandingPage={isLandingPage}
        baseClassesOverride={isLandingPage ? 'lg:!pl-0' : ''}
      />
    </div>
  );
};

export default LandingPageNavItems;
