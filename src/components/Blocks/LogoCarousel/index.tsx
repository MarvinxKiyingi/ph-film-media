import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type ILogoCarouselBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'logoCarousel' }
>;

const LogoCarousel = ({ _type }: ILogoCarouselBlocks) => {
  console.log('_type:', _type);
  return <section>LogoCarousel</section>;
};

export default LogoCarousel;
