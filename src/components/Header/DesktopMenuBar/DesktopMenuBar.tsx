import { FetchHeaderResult } from '../../../../sanity.types';
import Link from 'next/link';
import React from 'react';

type IDesktopMenuBar = {
  data: FetchHeaderResult;
};

const DesktopMenuBar = ({ data }: IDesktopMenuBar) => {
  if (!data) return null;
  const { linkReference } = data;

  return (
    <ul className='hidden lg:flex flex-col px-4 items-start text-b-lg lg:col-span-1 lg:flex-row lg:w-full lg:justify-end lg:gap-0 lg:text-b-sm lg:font-bold lg:px-0'>
      {linkReference?.map((link) =>
        link._type === 'externalLink' ? (
          <li
            key={link._key}
            className='lg:hover:underline lg:hover:underline-offset-[6px] lg:pl-8'
          >
            <Link
              href={link.link?.href || ''}
              className=''
              target='_blank'
              rel='noopener noreferrer'
            >
              {link.linkLabel}
            </Link>
          </li>
        ) : link._type === 'internalLink' ? (
          <li
            key={link._key}
            className='lg:hover:underline lg:hover:underline-offset-[6px] lg:pl-8'
          >
            <Link
              key={link._key}
              href={`/${link.page?.slug?.current || ''}`}
              className=''
            >
              {link.page?.title}
            </Link>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default DesktopMenuBar;
