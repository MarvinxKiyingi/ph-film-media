import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';
import HeroCarouselBlock from './HeroCarouselBlock';

const HeroCarousel = async ({
  block,
  idx,
}: {
  block: BlockListItem;
  idx: number;
}) => {
  if (!block) return null;

  return (
    <div
      key={idx}
      className='h-dvh lg:h-screen lg:px-p-desktop lg:overflow-hidden lg:pb-6'
    >
      <HeroCarouselBlock block={block} />
    </div>
  );
};

export default HeroCarousel;
