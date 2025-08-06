import { Link } from 'next-view-transitions';
import RichText from '../RichText/RichText';
import SocialIcons from '../Icons/SocialIcons';
import React from 'react';
import { FetchFooterResult } from '../../../sanity.types';

const currentYear = new Date().getFullYear();

const FooterContent = ({ data }: { data: FetchFooterResult }) => {
  if (!data) return null;
  const { title, email, text, socialMediaLinks, rights } = data;

  return (
    <footer className='flex gap-x-8 gap-y-10 px-5 py-10 lg:p-10 md:gap-1.5'>
      <div className='flex sm:flex-1'>
        <h3 className='text-b-16 text-gray'>{title}</h3>
      </div>

      <div className='flex flex-col gap-8 flex-1 lg:gap-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:border-b lg:border-gray lg:pb-1'>
            <p className='flex flex-wrap text-h-28 font-oswald uppercase border-b border-gray pb-1 lg:border-b-0 lg:pb-0 lg:w-full'>
              {email}
            </p>
            {text && <RichText content={text} className='text-b-12 gap-2' />}

            <ul className='flex items-center'>
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
          {text && <RichText content={text} className='text-b-12 gap-2' />}
        </div>

        <p className='flex text-b-9 font-bold text-gray lg:text-b-16'>
          {rights} ⏤ {currentYear} ©
        </p>
      </div>

      {/* <div className='flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-2'>
        <div className='lg:col-span-1 lg:flex lg:flex-col lg:justify-between'>
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

          <p className='text-b-9 font-bold hidden lg:flex'>
            {rights} ⏤ {currentYear} ©
          </p>
        </div>

        <div className='grid gap-4 lg:col-span-1'>
          <h3 className='text-h-28 uppercase lg:border-b lg:border-gray lg:pb-1'>
            {title}
          </h3>
          {text && <RichText content={text} className='text-b-12 gap-2' />}
        </div>
      </div>

      <p className='flex text-b-9 font-bold lg:hidden'>
        {rights} ⏤ {currentYear} ©
      </p> */}
    </footer>
  );
};

export default FooterContent;
