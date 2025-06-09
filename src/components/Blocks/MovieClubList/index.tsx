import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import MovieClubCard from './MovieClubCard';

export type IMovieClubListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieClubList' }
>;

const MovieClubList = (block: IMovieClubListBlocks) => {
  if (block._type !== 'movieClubList') return null;
  const { movies } = block;

  if (movies?.length === 0) return null;

  return (
    <section>
      <div className='page-x-spacing grid gap-10 grid-cols-1 md:grid-cols-2 lg:gap-2 lg:grid-cols-4'>
        {movies?.map((movieItem) => (
          <MovieClubCard key={movieItem.movie?._id} {...movieItem} />
        ))}
      </div>
    </section>
  );
};

export default MovieClubList;
