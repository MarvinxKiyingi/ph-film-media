'use client'; // Required if you're using this in a Client Component

import { FetchHeaderResult } from '../../../../sanity.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type IDesktopMenuBar = {
  data: FetchHeaderResult;
};

const DesktopMenuBar = ({ data }: IDesktopMenuBar) => {
  const pathname = usePathname();
  if (!data) return null;

  const { linkReference } = data;

  return (
    <ul className='hidden lg:flex group flex-col px-4 items-start text-b-lg lg:col-span-1 lg:flex-row lg:w-full lg:justify-end lg:gap-0 lg:text-b-sm lg:font-bold lg:px-0'>
      {linkReference?.map((link) => {
        const isInternal = link._type === 'internalLink';
        const slug = isInternal ? `/${link.page?.slug?.current || ''}` : '';
        const isActive = pathname === slug;

        const baseClasses =
          'transition-colors duration-300 lg:pl-8 hover:text-white';
        const colorClasses = isActive
          ? 'text-white'
          : 'text-white group-hover:text-gray-500';

        return (
          <li key={link._key} className=''>
            <Link
              href={isInternal ? slug : link.link?.href || ''}
              target={link._type === 'externalLink' ? '_blank' : undefined}
              rel={
                link._type === 'externalLink'
                  ? 'noopener noreferrer'
                  : undefined
              }
              className={`${baseClasses} ${colorClasses}`}
            >
              {isInternal ? link.page?.title : link.linkLabel}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenuBar;
