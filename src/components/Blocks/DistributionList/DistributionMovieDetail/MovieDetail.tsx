import { formatDate } from '@/utils/formatDate';
import {
  FetchDistributionMovieResult,
  SettingsQueryResult,
} from '../../../../../sanity.types';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import React from 'react';

const MovieDetail = ({
  movie,
  settings,
}: {
  movie: NonNullable<FetchDistributionMovieResult>;
  settings: SettingsQueryResult;
}) => {
  const {
    moviePoster,
    description,
    directors,
    writers,
    actors,
    languages,
    releaseDate,
    duration,
  } = movie;
  const {
    descriptionLabel,
    directorsLabel,
    writersLabel,
    actorsLabel,
    languagesLabel,
    releaseDateLabel,
    durationLabel,
  } = settings?.distributionMovieDetailTitles || {};

  if (!movie) return null;

  const renderMovieCredits = (className?: string) => {
    return (
      <div className={`grid gap-6 lg:mb-0 ${className}`}>
        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {directorsLabel}
          </h4>
          <div className='col-span-10'>
            {directors &&
              directors.map((director) => (
                <p key={director._id}>{director.director}</p>
              ))}
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {writersLabel}
          </h4>
          <div className='col-span-10'>
            {writers &&
              writers.map((writer) => <p key={writer._id}>{writer.writer}</p>)}
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {actorsLabel}
          </h4>
          <div className='col-span-10'>
            {actors &&
              actors.map((actor) => <p key={actor._id}>{actor.actor}</p>)}
          </div>
        </div>
      </div>
    );
  };
  const renderMovieDetails = (className?: string) => {
    return (
      <div className={`grid gap-6 ${className}`}>
        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {languagesLabel}
          </h4>
          <div className='col-span-10'>
            {languages &&
              languages.map((language) => (
                <p key={language._id}>{language.language}</p>
              ))}
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {releaseDateLabel}
          </h4>
          <div className='col-span-10'>
            <p>{formatDate(releaseDate)}</p>
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:grid lg:grid-cols-13 lg:gap-x-2'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {durationLabel}
          </h4>
          <div className='col-span-10'>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='page-x-spacing max-lg:py-p-mobile grid grid-cols-1 max-lg:first:border-t-0 lg:grid-cols-24 lg:gap-x-2 lg:p-p-desktop focus:outline-2 focus:outline-blue-500'>
      <div className='grid grid-cols-2 gap-y-10 lg:col-span-13 lg:col-start-10 lg:grid-cols-13 lg:gap-x-2 lg:h-fit'>
        {renderMovieCredits('lg:col-span-full lg:order-2')}
        {renderMovieDetails('lg:col-span-full lg:order-3')}

        <div className='col-span-full lg:grid lg:grid-cols-13 lg:order-1'>
          <h4 className='hidden lg:block text-h-12 !font-lato font-bold text-gray uppercase col-span-3'>
            {descriptionLabel}
          </h4>
          <div className='flex flex-col pb-10 lg:col-span-10 lg:pb-0'>
            {description && <RichText content={description} />}
          </div>
        </div>
      </div>

      <div className='mb-8 lg:row-start-1 lg:col-start-1 lg:col-span-8'>
        {moviePoster?.media && (
          <SanityImage
            {...moviePoster}
            className='h-full rounded-lg aspect-2/3 lg:h-auto'
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
