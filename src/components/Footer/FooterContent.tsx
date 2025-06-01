import Link from 'next/link';
import RichText from '../RichText/RichText';
import SocialIcons from '../Icons/SocialIcons';
import React from 'react';
import { FetchFooterResult } from '../../../sanity.types';

const FooterContent = ({ data }: { data: FetchFooterResult }) => {
  if (!data) return null;
  const { title, text, socialMediaLinks, rights } = data;

  return (
    <footer className='grid gap-y-10 px-5 py-10 lg:p-10'>
      <div className='flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-2'>
        <div className='lg:col-span-1'>
          <ul>
            {socialMediaLinks?.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.href || ''}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <SocialIcons href={link.href ?? undefined} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='grid gap-4 lg:col-span-1'>
          <h3 className='text-h-lg uppercase lg:border-b lg:border-gray lg:pb-1'>
            {title}
          </h3>
          {text && <RichText content={text} className='text-b-sm gap-2' />}
        </div>
      </div>

      <p className='text-b-xs font-bold lg:w-full lg:text-end'>
        {rights} ⏤ {new Date().getFullYear()} ©
      </p>
    </footer>
  );
};

export default FooterContent;
