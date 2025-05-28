import Link from 'next/link';
import type { FetchFooterResult } from '../../../sanity.types';
import RichText from '../RichText/RichText';
import Instagram from '../Icons/Instagram';

const SOCIAL_ICON_MAP: { [key: string]: React.ReactNode } = {
  instagram: <Instagram />,
};

function getSocialPlatformIcon(href?: string) {
  if (!href) return null;
  if (/instagram\.com/.test(href)) return SOCIAL_ICON_MAP.instagram;
  return null;
}

type IFooter = {
  data: FetchFooterResult;
};

const Footer = ({ data }: IFooter) => {
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
                  {getSocialPlatformIcon(link.href ?? undefined)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='grid gap-4 lg:col-span-1'>
          <h2 className='text-h-lg uppercase lg:border-b lg:border-gray lg:pb-1'>
            {title}
          </h2>
          {text && <RichText content={text} className='text-b-sm gap-2' />}
        </div>
      </div>

      <p className='text-b-xs font-bold'>
        {rights} ⏤ {new Date().getFullYear()} ©
      </p>
    </footer>
  );
};

export default Footer;
