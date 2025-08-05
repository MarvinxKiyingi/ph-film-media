import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';

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
    <section className='grid gap-10 page-x-spacing py-7 md:gap-1.5 md:grid-cols-24 md:py-10'>
      <div className='flex flex-col gap-8 md:col-start-13 md:col-span-10 md:h-fit'>
        {Array.isArray(textSection) &&
          textSection.map((section, idx) => (
            <div key={section.id ?? idx} className='flex flex-col gap-2'>
              <h3 className='text-b-12 font-bold !font-lato text-gray h-fit'>
                <span>{section.title}</span>
              </h3>

              <RichText
                key={section.id ?? idx}
                content={section.richText ?? []}
              />
            </div>
          ))}
      </div>

      {mediaItem?.media && (
        <div
          className='grid gap-5 h-fit md:row-start-1 md:col-start-1 md:col-span-8 lg:col-span-6'
          data-sanity-edit-target
        >
          <SanityImage
            {...mediaItem}
            className='aspect-4/5 rounded-lg'
            aspectRatio='4/5'
          />

          <h2 className='text-b-12 font-bold !font-lato text-gray'>
            <span>{mediaTitle}</span>
          </h2>
        </div>
      )}
    </section>
  );
};

export default ImageWithText;
