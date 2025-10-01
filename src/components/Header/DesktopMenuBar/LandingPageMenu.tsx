'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { IMenuLink } from './DesktopMenuBar';
import { isLinkActive } from './utils';
import MenuLink from './MenuLink';
import { FetchHeaderResult } from '../../../../sanity.types';

type ILandingPageMenu = {
  links: IMenuLink[];
  baseClassesOverride?: string;
  header: FetchHeaderResult;
};

const LandingPageMenu: React.FC<ILandingPageMenu> = ({
  links,
  baseClassesOverride,
}) => {
  const pathname = usePathname();

  const internalLinks = links.filter(
    (link) => link.link?.linkType === 'internalLink'
  );
  const externalLinks = links.filter(
    (link) => link.link?.linkType === 'externalLink'
  );

  return (
    <div className='hidden lg:w-full lg:flex lg:flex-1 lg:justify-between lg:font-extrabold lg:text-b-14 2xl:text-b-16'>
      {/* Internal Links */}
      <ul className='flex group'>
        {internalLinks.map((link) => {
          const isActive = isLinkActive(pathname, link);
          return (
            <MenuLink
              key={link._key}
              link={link}
              isActive={isActive}
              baseClassesOverride={`lg:!pl-0 lg:!pr-8 ${baseClassesOverride}`}
            />
          );
        })}
      </ul>

      {/* External Links */}
      <ul className='flex group'>
        {externalLinks.map((link) => (
          <MenuLink
            key={link._key}
            link={link}
            isActive={false}
            baseClassesOverride={`${baseClassesOverride}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default LandingPageMenu;
