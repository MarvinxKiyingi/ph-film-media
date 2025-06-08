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
    <section>
      <Marquee pauseOnHover autoFill>
        <ul
          className='grid grid-flow-col gap-4 pr-4'
          role='list'
          aria-label='Scrolling list of featured media cards'
        >
          {carouselItems?.map((item, idx) => (
            <MediaCard key={idx} item={item} />
          ))}
        </ul>
      </Marquee>
    </section>
  );
};

export default MediaCarousel;
