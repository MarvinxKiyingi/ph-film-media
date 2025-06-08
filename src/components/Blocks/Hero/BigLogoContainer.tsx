'use client';

import React from 'react';
import { BlockListItem } from '@/types/IBlockListItem';
import { baseUrl } from '@/sanity/lib/utils';
import { SanityImage } from 'sanity-image';
import ScrollDownIndicator from './ScrollDownIndicator';
import { useInView } from 'react-intersection-observer';
import { FetchFooterResult } from '../../../../sanity.types';
import FooterContent from '../../Footer/FooterContent';

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
  if (block._type !== 'hero') return null;

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
            <SanityImage
              id={block.logo.media.asset._id}
              baseUrl={baseUrl}
              alt={block.logo.media.alt ?? 'Ph Film & Media Big Logo'}
              width={block.logo.media.asset.metadata.dimensions?.width || 100}
              height={block.logo.media.asset.metadata.dimensions?.height || 100}
              hotspot={{
                x: block.logo.media.hotspot?.x || 0,
                y: block.logo.media.hotspot?.y || 0,
              }}
              crop={{
                top: block.logo.media.crop?.top || 0,
                left: block.logo.media.crop?.left || 0,
                bottom: block.logo.media.crop?.bottom || 0,
                right: block.logo.media.crop?.right || 0,
              }}
              // preview={block.logo.media.asset.metadata.lqip || ''}
              mode='cover'
              className='aspect-5/2 w-full'
              queryParams={{ q: 90 }}
            />
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
