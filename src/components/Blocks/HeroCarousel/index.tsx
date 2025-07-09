import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';
import HeroCarouselBlock from './HeroCarouselBlock';
import SanityImage from '@/components/Media/SanityImage';

const HeroCarousel = async ({
  block,
  idx,
}: {
  block: BlockListItem;
  idx: number;
}) => {
  if (!block || !('logo' in block)) return null;

  return (
    <div
      key={idx}
      className='grid gap-5 lg:h-[calc(100vh-var(--header-height-desktop-landing-page))] lg:flex lg:px-p-desktop lg:overflow-hidden lg:pb-4'
    >
      <div className='relative px-5 lg:hidden'>
        <div aria-label='Ph Film & Media Big Logo' className=''>
          {block.logo?.media &&
            block.logo.media.asset &&
            block.logo.media.asset.metadata && (
              <SanityImage
                {...block.logo}
                className='aspect-video'
                aspectRatio='16/9'
              />
            )}
        </div>
      </div>

      <HeroCarouselBlock block={block} />
    </div>
  );
};

export default HeroCarousel;
