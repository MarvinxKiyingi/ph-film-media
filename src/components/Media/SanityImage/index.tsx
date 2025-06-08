import React from 'react';
import { SanityImage as SanityImageRenderer } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import { determineAspectRatio } from './determineAspectRatio';
import { SanityImageProps } from './SanityImageObject';

const SanityImage = ({
  media,
  className = '',
  useImageAspect = false,
}: SanityImageProps) => {
  const { asset, alt, hotspot, crop } = media || {};

  if (!asset) return null;

  const dimensions = asset?.metadata?.dimensions;

  const aspectRatioInfo = useImageAspect
    ? determineAspectRatio(dimensions?.width || 0, dimensions?.height || 0)
    : null;

  return (
    <SanityImageRenderer
      id={asset._id}
      baseUrl={baseUrl}
      alt={alt ?? 'Media image'}
      width={dimensions?.width || 100}
      height={dimensions?.height || 100}
      hotspot={{
        x: hotspot?.x || 0,
        y: hotspot?.y || 0,
      }}
      crop={{
        top: crop?.top || 0,
        left: crop?.left || 0,
        bottom: crop?.bottom || 0,
        right: crop?.right || 0,
      }}
      queryParams={{ q: 90 }}
      mode='cover'
      className={`w-full object-cover ${aspectRatioInfo?.tailwindClass || ''} ${className}`}
    />
  );
};

export default SanityImage;
