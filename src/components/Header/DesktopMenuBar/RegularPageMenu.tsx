'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { IMenuLink } from './DesktopMenuBar';
import { isLinkActive } from './utils';
import MenuLink from './MenuLink';

interface IRegularPageMenu {
  links: IMenuLink[];
  baseClassesOverride?: string;
}

const RegularPageMenu: React.FC<IRegularPageMenu> = ({
  links,
  baseClassesOverride,
}) => {
  const pathname = usePathname();

  return (
    <div className='hidden lg:grid lg:items-end'>
      <ul className='grid h-fit text-b-21 lg:font-extrabold lg:text-b-14 xl:text-b-16 2xl:text-b-21 group'>
        {links.map((link) => {
          const isActive = isLinkActive(pathname, link);
          return (
            <MenuLink
              key={link._key}
              link={link}
              isActive={isActive}
              baseClassesOverride={baseClassesOverride}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RegularPageMenu;
