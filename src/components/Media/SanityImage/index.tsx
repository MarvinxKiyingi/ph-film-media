import React from 'react';
import { SanityImage as SanityImageRenderer } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import {
  SanityAssetSourceData,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageMetadata,
} from '../../../../sanity.types';

type SanityImageObject = {
  _type: 'mediaType';
  media: {
    _type: 'image';
    alt: string | null;
    crop: SanityImageCrop | null;
    hotspot: SanityImageHotspot | null;
    asset: {
      _id: string;
      _type: 'sanity.imageAsset';
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
  } | null;
};

type SanityImageProps = SanityImageObject & {
  className?: string;
};

const SanityImage = ({ media, className = '' }: SanityImageProps) => {
  const { asset, alt, hotspot, crop } = media || {};

  if (!asset) return null;

  const dimensions = asset?.metadata?.dimensions;

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
      className={`w-full object-cover ${className}`}
    />
  );
};

export default SanityImage;
