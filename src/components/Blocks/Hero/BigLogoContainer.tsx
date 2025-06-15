'use client';

import React from 'react';
import { BlockListItem } from '@/types/IBlockListItem';
import ScrollDownIndicator from './ScrollDownIndicator';
import { useInView } from 'react-intersection-observer';
import { FetchFooterResult } from '../../../../sanity.types';
import FooterContent from '../../Footer/FooterContent';
import SanityImage from '@/components/Media/SanityImage';

const BigLogoContainer = ({
  block,
  blockLength,
  footer,
}: {
  block: BlockListItem;
  blockLength: number;
  footer: FetchFooterResult;
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const hasMultipleBlocks = (blockLength || 0) > 1;
  if (!block || !('logo' in block)) return null;

  return (
    <div
      id='big-logo-container'
      className='relative px-5 lg:grid lg:gap-2 lg:grid-cols-12 lg:col-span-1 lg:order-1 lg:px-0 lg:overflow-auto'
    >
      <div
        aria-label='Ph Film & Media Big Logo'
        className='lg:col-start-5 lg:col-span-4 lg:h-screen lg:flex lg:items-center'
      >
        {block.logo?.media &&
          block.logo.media.asset &&
          block.logo.media.asset.metadata && (
            <SanityImage {...block.logo} className='aspect-5/2' />
          )}
      </div>

      <ScrollDownIndicator inView={inView} />

      {!hasMultipleBlocks && (
        <div className='hidden lg:block lg:col-span-12' ref={ref}>
          <FooterContent data={footer} />
        </div>
      )}
    </div>
  );
};

export default BigLogoContainer;
