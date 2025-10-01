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
    <div className='hidden lg:flex group'>
      <ul className='flex px-4 items-start text-b-21 lg:col-span-1 lg:flex-row lg:w-full lg:justify-end lg:gap-0 lg:text-b-14 lg:font-extrabold lg:px-0 2xl:text-b-16'>
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
