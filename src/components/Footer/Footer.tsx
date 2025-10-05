'use client';

import { FetchFooterResult } from '../../../sanity.types';
import FooterContent from './FooterContent';

const Footer = ({ footer }: { footer: FetchFooterResult }) => {
  return <FooterContent data={footer} />;
};

export default Footer;
