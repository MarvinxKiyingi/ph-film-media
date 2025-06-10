import SanityImage from '@/components/Media/SanityImage';

import { IDistributionListBlocks } from '.';
import RichText from '@/components/RichText/RichText';
import { SettingsQueryResult } from '../../../../sanity.types';
import Link from 'next/link';
import Button from '@/components/Button/Button';

type IDistributionMovieType = NonNullable<
  IDistributionListBlocks['movies']
>[number];

type IDistributionMovieCard = {
  movie: IDistributionMovieType;
  settings: SettingsQueryResult;
};

const DistributionMovieCard = ({ movie, settings }: IDistributionMovieCard) => {
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
  } = movie;

  const {
    directorsLabel,
    writersLabel,
    actorsLabel,
    languagesLabel,
    releaseDateLabel,
    durationLabel,
  } = settings?.distributionMovieDetailTitles ?? {};

  return (
    <div>
      {moviePoster?.media && (
        <SanityImage
          {...moviePoster}
          className='h-full rounded-lg aspect-4/5'
        />
      )}

      <div className='flex flex-col gap-1'>
        <h3 className='text-h-28 '>{title}</h3>
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {directorsLabel}
        </h4>
        {directors &&
          directors.map((director) => (
            <p key={director._id}>{director.director}</p>
          ))}
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {writersLabel}
        </h4>
        {writers &&
          writers.map((writer) => <p key={writer._id}>{writer.writer}</p>)}
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {actorsLabel}
        </h4>
        {actors && actors.map((actor) => <p key={actor._id}>{actor.actor}</p>)}
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {languagesLabel}
        </h4>
        {languages &&
          languages.map((language) => (
            <p key={language._id}>{language.language}</p>
          ))}
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {releaseDateLabel}
        </h4>
        <p>{releaseDate}</p>
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
          {durationLabel}
        </h4>
        <p>{duration}</p>
      </div>

      <div className='flex'>
        {description && <RichText content={description} />}
      </div>

      <div className='flex gap-6'>
        {button && (
          <div>
            <Link href={button?.buttonLink?.href ?? ''}>
              {button?.buttonLabel}
            </Link>
          </div>
        )}
        {button && (
          <div>
            <Button
              href={ticket?.ticketLink?.href ?? ''}
              label={ticket?.ticketLinkLabel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionMovieCard;
