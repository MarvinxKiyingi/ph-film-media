import React from 'react';
import {
  FetchHomeResult,
  FetchPageResult,
  SettingsQueryResult,
} from '../../../../sanity.types';
import DistributionMovieCard from './DistributionMovieCard';
import { client } from '@/sanity/lib/client';
import { settingsQuery } from '@/sanity/lib/queries';

export type IDistributionListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'distributionList' }
>;

const DistributionList = async (block: IDistributionListBlocks) => {
  if (block._type !== 'distributionList') return null;
  const settings = await client.fetch<SettingsQueryResult>(settingsQuery);
  const { movies } = block;

  return (
    <section className='page-x-spacing grid gap-5'>
      {movies?.map((movieItem, index) =>
        movieItem && '_id' in movieItem && 'title' in movieItem ? (
          <DistributionMovieCard
            key={`${movieItem._id}-${index}`}
            movie={movieItem}
            settings={settings}
          />
        ) : null
      )}
    </section>
  );
};

export default DistributionList;
