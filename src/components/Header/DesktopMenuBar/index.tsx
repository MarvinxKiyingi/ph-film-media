'use client';

import React from 'react';

import LandingPageMenu from './LandingPageMenu';
import RegularPageMenu from './RegularPageMenu';
import { IDesktopMenuBar } from './DesktopMenuBar';

const DesktopMenuBar = ({
  isLandingPage,
  baseClassesOverride,
  header,
}: IDesktopMenuBar) => {
  if (!header?.linkReference) return null;

  const { linkReference } = header;

  if (isLandingPage) {
    return (
      <LandingPageMenu
        links={linkReference}
        baseClassesOverride={baseClassesOverride}
        header={header}
      />
    );
  }

  return (
    <RegularPageMenu
      links={linkReference}
      baseClassesOverride={baseClassesOverride}
    />
  );
};

export default DesktopMenuBar;
