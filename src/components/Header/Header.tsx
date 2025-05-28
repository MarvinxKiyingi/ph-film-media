'use client';
import type { FetchHeaderResult } from '../../../sanity.types';
import Link from 'next/link';

type IHeader = {
  data: FetchHeaderResult;
};

const Header = ({ data }: IHeader) => {
  if (!data) return null;
  const { linkReference } = data;

  return (
    <nav className='lg:grid lg:gap-2  lg:px-10 lg:py-4 lg:grid-cols-2 lg:items-center '>
      <h1 className='hidden uppercase lg:flex lg:col-span-1 lg:text-b-lg'>
        <Link href='/' className='w-fit'>
          PH Film & Media
        </Link>
      </h1>
      <div className='flex px-4 items-center justify-between lg:hidden'>
        <div className='flex items-center gap-4'>
          <svg
            width='25'
            height='22'
            viewBox='0 0 25 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_57_367)'>
              <line
                x1='0.0333252'
                y1='8.43333'
                x2='24.0333'
                y2='8.43333'
                stroke='var(--color-white)'
              />
              <line
                x1='0.0333252'
                y1='12.1667'
                x2='24.0333'
                y2='12.1667'
                stroke='var(--color-white)'
              />
            </g>
            <defs>
              <clipPath id='clip0_57_367'>
                <rect width='24.0667' height='21.6' fill='white' />
              </clipPath>
            </defs>
          </svg>

          <span className='py-2.5 text-h-lg font-oswald uppercase'>Menu</span>
        </div>

        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.6671 11.667C22.8626 11.667 24.4606 11.6663 25.6115 12.4277C26.1254 12.7678 26.5653 13.2087 26.9054 13.7226C27.6667 14.8735 27.6671 16.4716 27.6671 19.667C27.6671 22.8624 27.6669 24.4605 26.9054 25.6113C26.5654 26.1251 26.1253 26.5652 25.6115 26.9052C24.4606 27.6667 22.8626 27.667 19.6671 27.667C16.4717 27.667 14.8736 27.6666 13.7228 26.9052C13.209 26.5653 12.7688 26.125 12.4288 25.6113C11.6674 24.4605 11.6671 22.8624 11.6671 19.667C11.6671 16.4713 11.6674 14.8735 12.4288 13.7226C12.7689 13.2087 13.2089 12.7678 13.7228 12.4277C14.8736 11.6665 16.4718 11.667 19.6671 11.667ZM19.6671 15.5254C17.3797 15.5254 15.5245 17.3796 15.5245 19.667C15.5245 21.9544 17.3797 23.8086 19.6671 23.8086C21.9543 23.8083 23.8087 21.9542 23.8087 19.667C23.8087 17.3797 21.9543 15.5256 19.6671 15.5254ZM19.6671 16.9267C21.1804 16.927 22.4073 18.1536 22.4073 19.667C22.4073 21.1803 21.1804 22.4069 19.6671 22.4072C18.1536 22.4072 16.9259 21.1805 16.9259 19.667C16.9259 18.1535 18.1536 16.9267 19.6671 16.9267ZM23.9728 14.3437C23.4353 14.3437 22.9991 14.7799 22.9991 15.3174C22.9992 15.8548 23.4354 16.29 23.9728 16.29C24.51 16.2898 24.9454 15.8546 24.9454 15.3174C24.9454 14.78 24.5101 14.3439 23.9728 14.3437Z'
            fill='var(--color-white)'
          />
        </svg>
      </div>
      <div className='flex flex-col px-4 items-start text-b-lg max-lg:bg-white max-lg:text-black lg:col-span-1 lg:flex-row lg:w-full lg:justify-end lg:gap-0 lg:text-b-sm lg:font-bold'>
        {linkReference?.map((link) =>
          link._type === 'externalLink' ? (
            <Link
              key={link._key}
              href={link.link?.href || ''}
              className='max-lg:py-3 lg:hover:underline lg:hover:underline-offset-[6px] lg:pl-8'
            >
              {link.linkLabel}
            </Link>
          ) : link._type === 'internalLink' ? (
            <Link
              key={link._key}
              href={`/${link.page?.slug?.current || ''}`}
              className='max-lg:py-3 lg:hover:underline lg:hover:underline-offset-[6px] lg:pl-8'
            >
              {link.page?.title}
            </Link>
          ) : null
        )}
      </div>
    </nav>
  );
};

export default Header;
