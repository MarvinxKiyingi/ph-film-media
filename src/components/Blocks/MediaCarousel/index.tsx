import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IMediaCarouselBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'mediaCarousel' }
>;

const MediaCarousel = ({ _type }: IMediaCarouselBlocks) => {
  console.log('_type', _type);
  return <div>Media Carousel</div>;
};

export default MediaCarousel;
