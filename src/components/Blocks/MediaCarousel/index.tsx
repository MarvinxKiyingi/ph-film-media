'use client';

import React from 'react';
import { FetchPageResult } from '../../../../sanity.types';
import Marquee from 'react-fast-marquee';
import MediaCard from './MediaCard';

export type IMediaCarouselBlock = NonNullable<
  NonNullable<FetchPageResult>['blockList']
>[number] & {
  _type: 'mediaCarousel';
};

const MediaCarousel = (block: IMediaCarouselBlock) => {
  if (block._type !== 'mediaCarousel') return null;
  const { carouselItems } = block;

  return (
    <section className='pb-3 md:pb-10' data-sanity-edit-target>
      <div className='h-[calc(265px+1rem+1.5rem)] lg:h-[calc(265px+1.5rem+1.5rem)] opacity-0 animate-[fadeIn_0.7s_ease-in-out_0.1s_forwards]'>
        <Marquee pauseOnHover autoFill speed={40}>
          <ul
            className='grid grid-flow-col gap-1.5 pr-1.5'
            role='list'
            aria-label='Scrolling list of featured media cards'
          >
            {carouselItems?.map((carouselItem, idx) => (
              <MediaCard
                key={carouselItem._key || idx}
                carouselItem={carouselItem}
              />
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  );
};

export default MediaCarousel;
