import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';
import HeroCarousel from './HeroCarousel';
import SanityImage from '@/components/Media/SanityImage';

const Hero = async ({ block, idx }: { block: BlockListItem; idx: number }) => {
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
              <SanityImage {...block.logo} className='aspect-5/2' />
            )}
        </div>
      </div>

      <HeroCarousel block={block} />
    </div>
  );
};

export default Hero;
