import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';

type IImageWithTextBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'imageWithText' }
>;

const ImageWithText = (block: IImageWithTextBlocks) => {
  if (block._type !== 'imageWithText') return null;
  const { textSection, mediaItem, mediaTitle } = block;

  return (
    <section
      className="grid gap-10 page-x-spacing py-7 md:gap-1.5 md:grid-cols-24 md:py-10"
      data-sanity-edit-target
    >
      <TextComponent textSection={textSection} />
      <ImageComponent mediaItem={mediaItem} mediaTitle={mediaTitle} />
    </section>
  );
};

export default ImageWithText;
