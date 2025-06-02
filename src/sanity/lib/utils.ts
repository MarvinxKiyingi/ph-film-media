import createImageUrlBuilder from '@sanity/image-url';

import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity';
import { dataset, projectId, studioUrl } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) => {
  // Accept either _ref or _id for the asset
  if (!source?.asset?._ref && !source?.asset?._id) {
    return undefined;
  }
  return imageBuilder?.image(source).auto('format').fit('max');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}

// for sanity image component url
export const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
