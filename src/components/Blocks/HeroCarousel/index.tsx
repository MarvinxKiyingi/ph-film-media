import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';

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
      className='grid gap-5 lg:h-[calc(100vh-var(--header-height-desktop-landing-page))] lg:flex lg:px-p-desktop lg:overflow-hidden lg:pb-6'
    >
      Hello from HeroCarousel
    </div>
  );
};

export default HeroCarousel;
