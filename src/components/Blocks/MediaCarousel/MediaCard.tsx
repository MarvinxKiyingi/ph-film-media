import React from 'react';

import { IMediaCarouselBlock } from '.';
import SanityImage from '@/components/Media/SanityImage';

type IMediaCard = NonNullable<
  NonNullable<IMediaCarouselBlock['carouselItems']>[number]
>;
const MediaCard = ({ carouselItem }: { carouselItem: IMediaCard }) => {
  if (!carouselItem) return null;
  const { title, mediaItem } = carouselItem;
  return (
    <li
      className='flex flex-col gap-4 lg:gap-6 w-[25vw] min-w-[354px] max-w-[600px]'
      role='listitem'
      data-sanity-edit-target
    >
      <div className='aspect-4/3 w-full h-full rounded-lg overflow-hidden'>
        {mediaItem?.media && (
          <SanityImage
            {...mediaItem}
            className='rounded-lg w-full h-full object-cover'
            aspectRatio='4/3'
          />
        )}
      </div>

      {title && <h4 className='text-b-16 font-bold !font-lato'>{title}</h4>}
    </li>
  );
};

export default MediaCard;
