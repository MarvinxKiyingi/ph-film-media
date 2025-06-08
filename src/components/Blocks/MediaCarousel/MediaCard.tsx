import React from 'react';
import { SanityImage } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import { IMediaCarouselBlock } from '.';

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
      <SanityImage
        id={mediaItem?.media?.asset?._id || ''}
        baseUrl={baseUrl}
        alt={mediaItem?.media?.alt ?? 'Featured media card'}
        width={mediaItem?.media?.asset?.metadata?.dimensions?.width || 100}
        height={mediaItem?.media?.asset?.metadata?.dimensions?.height || 100}
        hotspot={{
          x: mediaItem?.media?.hotspot?.x || 0,
          y: mediaItem?.media?.hotspot?.y || 0,
        }}
        crop={{
          top: mediaItem?.media?.crop?.top || 0,
          left: mediaItem?.media?.crop?.left || 0,
          bottom: mediaItem?.media?.crop?.bottom || 0,
          right: mediaItem?.media?.crop?.right || 0,
        }}
        mode='cover'
        className='rounded-lg aspect-4/3 w-full h-auto object-cover'
      />

      {title && <h2 className='text-b-16 font-bold'>{title}</h2>}
    </li>
  );
};

export default MediaCard;
