import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';
import HeroCarousel from './HeroCarousel';
import BigLogoContainer from './BigLogoContainer';
import { client } from '@/sanity/lib/client';
import { fetchFooter } from '@/sanity/lib/queries';

const Hero = async ({
  block,
  idx,
  blockLength,
}: {
  block: BlockListItem;
  idx: number;
  blockLength: number;
}) => {
  const footer = await client.fetch(fetchFooter);
  if (!block || !('logo' in block)) return null;

  return (
    <div
      key={idx}
      className='grid gap-5 lg:h-screen lg:grid-cols-2 lg:gap-0 lg:overflow-hidden'
    >
      <BigLogoContainer
        block={block}
        blockLength={blockLength}
        footer={footer}
      />

      <div className='lg:grid lg:grid-cols-12'>
        <HeroCarousel block={block} />
      </div>
    </div>
  );
};

export default Hero;
