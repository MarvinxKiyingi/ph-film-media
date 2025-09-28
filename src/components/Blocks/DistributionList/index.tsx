import React from 'react';
import {
  FetchHomeResult,
  FetchPageResult,
  Slug,
} from '../../../../sanity.types';
import DistributionMovieCard from './DistributionMovieCard';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import type { SettingsQueryResult } from '../../../../sanity.types';

export type IDistributionListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'distributionList' }
>;

const DistributionList = async ({
  block,
  slug,
}: {
  block: IDistributionListBlocks;
  slug: Slug | null;
}) => {
  if (block._type !== 'distributionList') return null;

  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });

  const { movies } = block;

  return (
    <section className='page-x-spacing grid gap-5' data-sanity-edit-target>
      {movies?.map((movieItem, index) =>
        movieItem && '_id' in movieItem && 'title' in movieItem ? (
          <DistributionMovieCard
            key={`${movieItem._id}-${index}`}
            movie={movieItem}
            settings={settings}
            slug={slug}
          />
        ) : null
      )}
    </section>
  );
};

export default DistributionList;
