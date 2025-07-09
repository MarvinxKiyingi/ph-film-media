export type SanityImageObject = {
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

export type SanityImageProps = SanityImageObject & {
  className?: string;
  mode?: 'cover' | 'contain' | undefined;
  useImageAspect?: boolean;
  aspectRatio?: '4/5' | '16/9' | '4/3' | 'square' | '2/3';
};
