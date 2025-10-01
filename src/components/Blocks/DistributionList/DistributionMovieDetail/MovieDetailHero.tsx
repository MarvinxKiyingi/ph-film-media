import React from 'react';
import { FetchDistributionMovieResult } from '../../../../../sanity.types';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import Button from '@/components/Button/Button';
import PlayIcon from '@/components/Icons/PlayIcon';
import TrailerOverlay from '@/components/TrailerOverlay/TrailerOverlay';

const MovieDetailHero = (movie: FetchDistributionMovieResult) => {
  if (!movie) return null;
  const { title, movieBanner, description, button, ticket, trailer } = movie;

  return (
    <section
      className='grid max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:items-center'
      data-sanity-edit-target
    >
      <div className='flex flex-col justify-end relative max-lg:h-screen lg:grid lg:grid-cols-24 lg:gap-2'>
        <div className='flex flex-col gap-8 z-10 max-lg:px-p-mobile max-lg:pb-p-mobile lg:px-p-desktop lg:col-span-full lg:flex-row lg:justify-between '>
          <div className='grid gap-4 lg:whitespace-nowrap'>
            <h1
              className='text-h-50 leading-none uppercase lg:leading-[1.4] 2xl:text-h-67'
              data-sanity-edit-target
            >
              {title}
            </h1>
            <div className='block lg:hidden' data-sanity-edit-target>
              {description && (
                <RichText content={description} className='!line-clamp-[5]' />
              )}
            </div>
          </div>
          <div className='flex gap-6 lg:items-center' data-sanity-edit-target>
            {ticket && (
              <div className='flex'>
                <Button
                  href={ticket?.ticketLink?.externalLink ?? ''}
                  label={ticket?.ticketLinkLabel ?? 'Biljetter'}
                  className='ticket-button'
                />
              </div>
            )}
            {button && (
              <div className='flex'>
                <Button
                  href={button?.buttonLink?.externalLink ?? ''}
                  label={
                    button?.buttonLabel ? button.buttonLabel : 'Pressmaterial'
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className='absolute inset-0 h-full lg:relative lg:h-auto lg:col-span-full'>
          {movieBanner?.media && (
            <div data-sanity-edit-target>
              <SanityImage
                {...movieBanner}
                className='h-full lg:aspect-video z-0'
                aspectRatio='16/9'
              />
            </div>
          )}

          <div
            className='flex absolute inset-0 w-full h-full z-40 justify-center items-center pointer-events-none'
            data-sanity-edit-target
          >
            {trailer?.trailerLink?.externalLink && (
              <div className='pointer-events-auto'>
                <TrailerOverlay trailer={trailer} triggerIcon={<PlayIcon />} />
              </div>
            )}
          </div>

          {/* Bottom fade  */}
          <div className='block absolute bottom-0 w-full h-2/4 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-0' />
        </div>
      </div>
    </section>
  );
};

export default MovieDetailHero;
