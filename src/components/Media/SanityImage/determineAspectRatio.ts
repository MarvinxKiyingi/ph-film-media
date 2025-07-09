import { SanityImageObject } from './SanityImageObject';

type IDetermineAspectRatio = {
  tailwindClass:
    | 'aspect-16/9'
    | 'aspect-4/3'
    | 'aspect-4/5'
    | 'aspect-square'
    | 'aspect-2/3';
};

// Aspect ratio configuration for dimensions
export const ASPECT_RATIO_CONFIG = {
  'aspect-16/9': { width: 1600, height: 900 },
  'aspect-4/3': { width: 1200, height: 900 },
  'aspect-square': { width: 1000, height: 1000 },
  'aspect-2/3': { width: 800, height: 1200 },
  'aspect-4/5': { width: 800, height: 1000 },
} as const;

// Aspect ratio targets for comparison
const ASPECT_RATIO_TARGETS = {
  'aspect-16/9': 16 / 9, // ≈ 1.7778
  'aspect-4/3': 4 / 3, // ≈ 1.3333
  'aspect-square': 1, // = 1.0
  'aspect-2/3': 2 / 3, // ≈ 0.6667
  'aspect-4/5': 4 / 5, // = 0.8
} as const;

export const determineAspectRatio = (
  media: SanityImageObject['media']
): IDetermineAspectRatio => {
  // Default fallback
  const fallback: IDetermineAspectRatio = {
    tailwindClass: 'aspect-16/9',
  };

  if (!media?.asset?.metadata?.dimensions) return fallback;

  const { width: originalWidth, height: originalHeight } =
    media.asset.metadata.dimensions;
  const { crop } = media;

  // Calculate effective dimensions after crop
  let effectiveWidth = originalWidth;
  let effectiveHeight = originalHeight;

  if (crop) {
    const cropWidth =
      originalWidth * (1 - (crop.left || 0) - (crop.right || 0));
    const cropHeight =
      originalHeight * (1 - (crop.top || 0) - (crop.bottom || 0));

    if (cropWidth > 0 && cropHeight > 0) {
      effectiveWidth = cropWidth;
      effectiveHeight = cropHeight;
    }
  }

  const aspectRatio = effectiveWidth / effectiveHeight;

  // Find the closest ratio
  let closestRatio: keyof typeof ASPECT_RATIO_TARGETS = 'aspect-16/9';
  let minDistance = Infinity;

  for (const [ratio, targetValue] of Object.entries(ASPECT_RATIO_TARGETS)) {
    const distance = Math.abs(aspectRatio - targetValue);
    if (distance < minDistance) {
      minDistance = distance;
      closestRatio = ratio as keyof typeof ASPECT_RATIO_TARGETS;
    }
  }

  return {
    tailwindClass: closestRatio,
  };
};
