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

const PageTitle = (block: IPageTitleBlock | IPageDataTitle) => {
  const { title, visibility } = block;

  // Build visibility classes based on settings
  const visibilityClasses = [
    visibility?.hideOnMobile && 'max-lg:hidden',
    visibility?.hideOnDesktop && 'lg:hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={`grid page-x-spacing ${visibilityClasses}`}
      data-sanity-edit-target
    >
      <h1 className='text-h-50 break-words uppercase lg:leading-[1.4] 2xl:text-h-67'>
        {title}
      </h1>
    </section>
  );
};

export default PageTitle;
