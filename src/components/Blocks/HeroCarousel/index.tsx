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
      className='max-lg:min-h-screen h-dvh lg:h-[calc(100dvh-var(--spacing-p-desktop))] lg:overflow-hidden'
    >
      <HeroCarouselBlock block={block} />
    </section>
  );
};

export default HeroCarousel;
