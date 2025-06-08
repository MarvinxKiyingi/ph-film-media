import React from 'react';

import { IMediaCarouselBlock } from '.';
import SanityImage from '@/components/Media/SanityImage';

type IMediaCard = NonNullable<
  NonNullable<IMediaCarouselBlock['carouselItems']>[number]
>;
const MediaCard = ({ item }: { item: IMediaCard }) => {
  if (!item) return null;
  const { title, mediaItem } = item;
  return (
    <li
      className='flex flex-col gap-4 lg:gap-6 w-[25vw] min-w-[354px] max-w-[600px]'
      role='listitem'
    >
      {mediaItem?.media && (
        <SanityImage {...mediaItem} className='rounded-lg aspect-4/3' />
      )}

      {title && <h3 className='text-b-16 font-bold !font-lato'>{title}</h3>}
    </li>
  );
};

export default MediaCard;
