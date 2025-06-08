type IDetermineAspectRatio = {
  tailwindClass: 'aspect-square' | 'aspect-16/9';
};

export const determineAspectRatio = (
  width?: number,
  height?: number
): IDetermineAspectRatio => {
  // Default fallback
  const fallback: IDetermineAspectRatio = {
    tailwindClass: 'aspect-16/9',
  };

  if (!width || !height) return fallback;

  const aspectRatio = width / height;
  const SQUARE_RATIO = 1;
  const WIDESCREEN_RATIO = 16 / 9; // ≈ 1.7778

  const distanceToSquare = Math.abs(aspectRatio - SQUARE_RATIO);
  const distanceToWidescreen = Math.abs(aspectRatio - WIDESCREEN_RATIO);

  const isSquare = distanceToSquare < distanceToWidescreen;

  const tailwindClass = isSquare ? 'aspect-square' : 'aspect-16/9';

  return {
    tailwindClass,
  };
};
