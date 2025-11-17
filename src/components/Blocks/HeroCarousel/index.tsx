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
    <section
      key={idx}
      className='max-lg:min-h-[100svh] h-[100svh] lg:h-[calc(100vh-2*var(--spacing-p-desktop))] lg:overflow-hidden'
    >
      <HeroCarouselBlock block={block} />
    </section>
  );
};

export default HeroCarousel;
