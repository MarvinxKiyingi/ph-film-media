import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IMovieHeroBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'moviesHeroCarousel' }
>;

const MoviesHeroCarousel = ({ _type }: IMovieHeroBlocks) => {
  console.log('_type:', _type);
  return <section>MoviesHeroCarousel</section>;
};

export default MoviesHeroCarousel;
