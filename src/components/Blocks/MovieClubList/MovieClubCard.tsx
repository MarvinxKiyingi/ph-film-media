import React from 'react';
import SanityImage from '@/components/Media/SanityImage';
import { IMovieClubListBlocks } from '.';

type IMovieClubCard = NonNullable<
  NonNullable<IMovieClubListBlocks['movies']>[number]
>;
const MovieClubCard = ({ movie }: IMovieClubCard) => {
  if (!movie) return null;
  const { title, movieBanner } = movie || {};
  return (
    <div>
      {movieBanner &&
        movieBanner._type === 'mediaType' &&
        movieBanner.media && (
          <div className='relative grid gap-4 group'>
            <SanityImage
              {...movieBanner}
              className='h-full rounded-lg aspect-square hover:grayscale lg:transition-all lg:duration-300'
              aspectRatio='square'
            />
            {title && (
              <h2
                className='relative text-b-21  font-bold text-gray md:text-white
                lg:absolute lg:inset-0 lg:p-4 lg:flex lg:text-h-28 lg:items-center lg:justify-center lg:text-center uppercase 2xl:text-h-37
                lg:pointer-events-none lg:opacity-0 lg:group-hover:opacity-100
                lg:transition-opacity lg:duration-300'
              >
                {title}
              </h2>
            )}
          </div>
        )}
    </div>
  );
};

export default MovieClubCard;
