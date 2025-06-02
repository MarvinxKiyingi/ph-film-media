'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const HeaderLogo = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {isHome ? (
        <h1 className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-lg'>
          <Link href='/' className='w-fit hidden'>
            PH Film & Media
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='hidden uppercase font-oswald font-bold lg:flex lg:col-span-1 lg:text-b-lg w-fit'
        >
          PH Film & Media
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
