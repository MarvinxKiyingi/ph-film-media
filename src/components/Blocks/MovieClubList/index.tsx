import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IMovieClubListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieClubList' }
>;

const MovieClubList = ({ movies }: IMovieClubListBlocks) => {
  console.log('movies:', movies);
  return <div>MovieClubList</div>;
};

export default MovieClubList;
