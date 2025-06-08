'use client';
import { usePathname } from 'next/navigation';
import { FetchFooterResult } from '../../../sanity.types';
import FooterContent from './FooterContent';

import { useMediaQuery } from 'react-responsive';

const Footer = ({
  footer,
  hasMultipleBlocks,
}: {
  footer: FetchFooterResult;
  hasMultipleBlocks?: boolean;
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const pathname = usePathname();
  const isHome = pathname === '/';
  const showFooter = isMobile || !isHome || (isHome && hasMultipleBlocks);

  if (!showFooter) return null;

  return <FooterContent data={footer} />;
};

export default Footer;
