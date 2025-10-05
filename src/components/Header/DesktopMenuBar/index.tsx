'use client';

import React from 'react';
import RegularPageMenu from './RegularPageMenu';
import { IDesktopMenuBar } from './DesktopMenuBar';
import HeaderLogo from '../HeaderLogo';

const DesktopMenuBar = ({ baseClassesOverride, header }: IDesktopMenuBar) => {
  if (!header?.linkReference) return null;

  const { linkReference } = header;

  return (
    <>
      <HeaderLogo header={header} variant='desktop' />

      <RegularPageMenu
        links={linkReference}
        baseClassesOverride={baseClassesOverride}
      />
    </>
  );
};

export default DesktopMenuBar;
