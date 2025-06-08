import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IImageWithTextBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'imageWithText' }
>;

const ImageWithText = ({ _type }: IImageWithTextBlocks) => {
  console.log('_type:', _type);

  return <section>ImageWithText</section>;
};

export default ImageWithText;
