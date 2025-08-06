'use client';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const HeaderLogo = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {isHome ? (
        <h1 className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-21'>
          <Link
            href='/'
            className='w-fit opacity-0'
            aria-current='page'
            aria-label='homepage | PH Film & Media'
          >
            <span className='sr-only !relative'>PH Film & Media</span>
          </Link>
        </h1>
      ) : (
        <Link
          href='/'
          className='hidden uppercase font-oswald font-bold lg:flex lg:col-span-1 lg:text-[1.5rem] w-fit'
          aria-label='PH Film & Media homepage'
        >
          <span>PH Film & Media</span>
        </Link>
      )}
    </>
  );
};

export default HeaderLogo;
