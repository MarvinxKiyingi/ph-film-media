import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IPageTitleBlock = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'pageTitle' }
>;
type IPageDataTitle = Extract<
  NonNullable<NonNullable<FetchPageResult | FetchHomeResult>['title']>[number],
  { _type: 'pageTitle' }
>;

const PageTitle = ({ title }: IPageTitleBlock | IPageDataTitle) => {
  return (
    <div className='grid page-x-spacing'>
      <h1 className='text-h-67 break-words lg:text-h-90 uppercase'>{title}</h1>
    </div>
  );
};

export default PageTitle;
