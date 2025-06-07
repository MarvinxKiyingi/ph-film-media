'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderLogo = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {isHome ? (
        <h1 className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-lg'>
          <Link
            href='/'
            className='w-fit'
            aria-current='page'
            aria-label='homepage | PH Film & Media'
          >
            <span className='sr-only'>PH Film & Media</span>
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='hidden uppercase font-oswald font-bold lg:flex lg:col-span-1 lg:text-b-lg w-fit'
          aria-label='PH Film & Media homepage'
        >
          <span>PH Film & Media</span>
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
