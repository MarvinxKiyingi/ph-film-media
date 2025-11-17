import React from 'react';
import { SanityImage as SanityImageRenderer } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import {
  determineAspectRatio,
  ASPECT_RATIO_CONFIG,
} from './determineAspectRatio';
import { SanityImageProps } from './SanityImageObject';

const SanityImage = ({
  media,
  className = '',
  useImageAspect = false,
  aspectRatio = '4/5',
  mode = 'cover',
}: SanityImageProps) => {
  const { asset, alt, hotspot, crop } = media || {};

  if (!asset) return null;

  const aspectRatioInfo = useImageAspect ? determineAspectRatio(media) : null;

  // Use overridable aspectRatio prop if provided, otherwise use calculated aspectRatioInfo
  const finalAspectRatio = aspectRatio
    ? (`aspect-${aspectRatio}` as keyof typeof ASPECT_RATIO_CONFIG)
    : aspectRatioInfo?.tailwindClass;

  const dimensions = finalAspectRatio
    ? ASPECT_RATIO_CONFIG[finalAspectRatio]
    : ASPECT_RATIO_CONFIG['aspect-4/5'];

  return (
    <SanityImageRenderer
      id={asset._id}
      baseUrl={baseUrl}
      alt={alt ?? 'Media image'}
      width={dimensions.width}
      height={dimensions.height}
      mode={mode}
      hotspot={hotspot}
      crop={crop}
      queryParams={{ q: 90 }}
      className={`w-full ${aspectRatioInfo?.tailwindClass || ''} ${className}`}
    />
  );
};

export default SanityImage;
