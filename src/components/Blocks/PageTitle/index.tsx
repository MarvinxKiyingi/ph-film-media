import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IPageTitleBlock = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'pageTitle' }
>;
type IPageDataTitle = Extract<
  NonNullable<NonNullable<FetchPageResult | FetchHomeResult>['pageTitle']>,
  { _type: 'pageTitle' }
>;

const PageTitle = ({ title }: IPageTitleBlock | IPageDataTitle) => {
  return (
    <h1 className='grid page-x-spacing text-h-50 break-words lg:text-h-67 uppercase'>
      {title}
    </h1>
  );
};

export default PageTitle;
