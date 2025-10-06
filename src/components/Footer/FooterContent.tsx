import { Link } from 'next-view-transitions';
import RichText from '../RichText/RichText';
import SocialIcons from '../Icons/SocialIcons';
import React from 'react';
import { FetchFooterResult } from '../../../sanity.types';
import ClickableEmail from './ClickableEmail';
import { linkResolver } from '@/sanity/lib/utils';

const currentYear = new Date().getFullYear();

const FooterContent = ({ data }: { data: FetchFooterResult }) => {
  if (!data) return null;
  const { title, email, text, socialMediaLinks, rights } = data;

  return (
    <footer className='flex gap-x-8 gap-y-10 page-x-spacing py-10 pt-20 lg:py-10 lg:pt-20 md:gap-1.5'>
      <div className='flex flex-1'>
        <h3 className='text-b-16 text-gray'>{title}</h3>
      </div>

      <div className='flex flex-col gap-8 flex-1 lg:gap-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:border-b lg:border-gray lg:pb-1'>
            {email && <ClickableEmail email={email} />}
            {text && <RichText content={text} className='text-b-12 gap-2' />}

            <ul className='flex items-center'>
              {socialMediaLinks?.map((link) => {
                const resolvedHref = linkResolver(link);
                const isExternal =
                  resolvedHref &&
                  /^https?:\/\/|^mailto:|^tel:/.test(resolvedHref);

                if (!resolvedHref) return null;

                return (
                  <li key={link._key}>
                    {isExternal ? (
                      <a
                        href={resolvedHref}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <SocialIcons href={resolvedHref} />
                      </a>
                    ) : (
                      <Link href={resolvedHref}>
                        <SocialIcons href={resolvedHref} />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {text && <RichText content={text} className='text-b-12 gap-2' />}
        </div>

        <p className='flex text-b-9 font-bold text-gray lg:text-b-14'>
          {rights} ⏤ {currentYear} ©
        </p>
      </div>
    </footer>
  );
};

export default FooterContent;
