import { FetchHomeResult } from '../../sanity.types';

export type BlockListItem = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number];
