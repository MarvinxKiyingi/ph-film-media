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
    >
      {mediaItem?.media && (
        <SanityImage {...mediaItem} className='rounded-lg aspect-4/3' />
      )}

      {title && <h4 className='text-b-16 font-bold !font-lato'>{title}</h4>}
    </li>
  );
};

export default MediaCard;
