'use client';
import type { FetchHeaderResult } from '../../../sanity.types';
import Link from 'next/link';
import MobileMenuBar from './MobileMenuBar/MobileMenuBar';
import DesktopMenuBar from './DesktopMenuBar/DesktopMenuBar';
import { usePathname } from 'next/navigation';

import { useState } from 'react';
type IHeader = {
  data: FetchHeaderResult;
};

const Header = ({ data }: IHeader) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  if (!data) return null;

  return (
    <nav className='max-lg:min-h-[51.48px] max-lg:mt-5 z-50 lg:grid lg:gap-2 lg:px-10 lg:py-4 lg:grid-cols-2 lg:items-center '>
      {pathname === '/' ? (
        <h1 className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-lg'>
          <Link href='/' className='w-fit'>
            PH Film & Media
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-lg w-fit'
        >
          PH Film & Media
        </Link>
      )}

      <MobileMenuBar isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      <DesktopMenuBar data={data} />
    </nav>
  );
};

export default Header;
