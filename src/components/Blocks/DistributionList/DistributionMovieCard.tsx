'use client';

import SanityImage from '@/components/Media/SanityImage';
import { notFound, useRouter } from 'next/navigation';
import { SettingsQueryResult, Slug } from '../../../../sanity.types';
import Button from '@/components/Button/Button';
import { formatDate } from '@/utils/formatDate';
import TrailerOverlay from '@/components/TrailerOverlay/TrailerOverlay';
import RichText from '@/components/RichText/RichText';
import { generateDistributionMovieSlug } from '@/utils/generateDistributionMovieSlug';
import { IDistributionListBlocks } from '.';
import { useInView } from 'react-intersection-observer';

type IDistributionMovieType = NonNullable<
  IDistributionListBlocks['movies']
>[number];

type IDistributionMovieCard = {
  movie: IDistributionMovieType;
  settings: SettingsQueryResult;
  slug: Slug | null;
};

const DistributionMovieCard = ({
  movie,
  settings,
  slug,
}: IDistributionMovieCard) => {
  const router = useRouter();
  const { ref: posterRef, inView: isPosterVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  if (!movie || !('_id' in movie)) return null;
  const {
    title,
    directors,
    writers,
    actors,
    languages,
    releaseDate,
    duration,
    description,
    moviePoster,
    button,
    ticket,
    trailer,
  } = movie;

  const {
    directorsLabel,
    writersLabel,
    actorsLabel,
    languagesLabel,
    releaseDateLabel,
    durationLabel,
  } = settings?.distributionMovieDetailTitles ?? {};

  if (!movie) {
    console.log('Movie not found for slug:', movie);
    notFound();
  }

  const movieUrl = generateDistributionMovieSlug(
    slug?.current ?? '',
    movie.slug?.current ?? ''
  );

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    router.push(movieUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(movieUrl);
    }
  };

  type PersonItem = {
    _id: string;
    [key: string]: string | null;
  };

  const renderPersonList = (items: PersonItem[] | null, label: string) => (
    <div className='flex flex-col gap-1'>
      <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
        {label}
      </h4>
      {items?.map((item) => <p key={item._id}>{Object.values(item)[1]}</p>)}
    </div>
  );

  const renderMovieCredits = (className?: string) => (
    <div
      className={`grid gap-6 mb-6 lg:col-start-6 lg:col-span-4 lg:h-fit ${className}`}
    >
      {directorsLabel && renderPersonList(directors, directorsLabel)}
      {writersLabel && renderPersonList(writers, writersLabel)}
      {actorsLabel && renderPersonList(actors, actorsLabel)}
    </div>
  );

  const renderMovieDetails = (className?: string) => (
    <div
      className={`grid gap-6 mb-6 lg:col-start-10 lg:col-span-3 lg:h-fit ${className}`}
    >
      {languagesLabel && renderPersonList(languages, languagesLabel)}
      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {releaseDateLabel}
        </h4>
        <p>{formatDate(releaseDate)}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {durationLabel}
        </h4>
        <p className='capitalize'>{duration}</p>
      </div>
    </div>
  );

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label={`View details for ${title}`}
      className='grid grid-cols-1 border-t border-white/20 pt-4 max-lg:first:pt-0 max-lg:first:border-t-0 lg:grid-cols-24 lg:gap-x-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500'
    >
      <div
        ref={posterRef}
        className={`mb-8 lg:row-start-1 lg:col-start-20 lg:col-span-full transition-all duration-700 ease-out ${
          isPosterVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {moviePoster?.media && (
          <SanityImage
            {...moviePoster}
            className='h-full rounded-lg aspect-2/3 lg:h-auto'
            aspectRatio='2/3'
          />
        )}
      </div>

      <div className='grid mb-10 lg:row-start-1 lg:col-start-1 lg:col-span-5 lg:mb-0'>
        <h3 className='text-h-28 uppercase lg:text-h-21 lg:pr-[20%]'>
          {title}
        </h3>
      </div>

      {renderMovieCredits('hidden lg:grid')}
      {renderMovieDetails('hidden lg:grid')}

      <div className='grid grid-cols-2 pb-4 lg:hidden'>
        {renderMovieCredits()}
        {renderMovieDetails()}
      </div>

      <div className='grid gap-6 h-fit lg:col-start-13 lg:col-span-6'>
        <div className='grid gap-2 h-fit'>
          {description && (
            <div className='grid'>
              <RichText
                content={description}
                className='lg:!line-clamp-[8] 2xl:!line-clamp-[12]'
              />
            </div>
          )}

          {trailer?.trailerLink?.href && <TrailerOverlay trailer={trailer} />}
        </div>

        <div className='flex gap-6 h-fit'>
          {ticket && (
            <Button
              href={ticket?.ticketLink?.href ?? ''}
              label={ticket?.ticketLinkLabel ?? 'Biljetter'}
              className='ticket-button'
            />
          )}
          {button && (
            <Button
              href={button?.buttonLink?.href ?? ''}
              label={button?.buttonLabel ?? 'Pressmaterial'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionMovieCard;
