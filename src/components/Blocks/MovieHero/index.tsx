import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IMovieHeroBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieHero' }
>;

const MovieHero = ({ _type }: IMovieHeroBlocks) => {
  console.log('_type:', _type);
  return <div>MovieHero</div>;
};

export default MovieHero;
