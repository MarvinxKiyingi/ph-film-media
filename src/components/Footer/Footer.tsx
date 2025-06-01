'use client';
import { usePathname } from 'next/navigation';
import { FetchFooterResult } from '../../../sanity.types';
import FooterContent from './FooterContent';

const Footer = ({
  footer,
  hasMultipleBlocks,
}: {
  footer: FetchFooterResult;
  hasMultipleBlocks: boolean;
}) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const showFooter = !isHome || (isHome && hasMultipleBlocks);

  if (!showFooter) return null;

  return <FooterContent data={footer} />;
};

export default Footer;
