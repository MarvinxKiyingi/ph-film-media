import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IDistributionListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'distributionList' }
>;

const DistributionList = ({ _type }: IDistributionListBlocks) => {
  console.log('_type', _type);
  return <div>DistributionList</div>;
};

export default DistributionList;
