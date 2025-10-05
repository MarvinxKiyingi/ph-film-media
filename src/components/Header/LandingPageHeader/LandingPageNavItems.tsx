import React from 'react';
import DesktopMenuBar from '@/components/Header/DesktopMenuBar';
import { FetchHeaderResult } from '../../../../sanity.types';

type ILandingPageNavItems = {
  isLandingPage: boolean;
  header: FetchHeaderResult;
};

const LandingPageNavItems = ({ header }: ILandingPageNavItems) => {
  if (!header) return null;

  return (
    <div className='flex'>
      <DesktopMenuBar header={header} />
    </div>
  );
};

export default LandingPageNavItems;
