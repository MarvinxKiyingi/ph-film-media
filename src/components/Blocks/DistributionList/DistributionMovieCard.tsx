import SanityImage from '@/components/Media/SanityImage';

import { IDistributionListBlocks } from '.';
import { SettingsQueryResult } from '../../../../sanity.types';
import Button from '@/components/Button/Button';
import { formatDate } from '@/utils/formatDate';
import TrailerOverlay from '@/components/TrailerOverlay/TrailerOverlay';
import RichText from '@/components/RichText/RichText';
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

  return (
    <div className='grid grid-cols-1 border-t border-gray pt-4 max-lg:first:pt-0 max-lg:first:border-t-0 lg:grid-cols-24 lg:gap-x-2'>
      <div className='mb-8 lg:row-start-1 lg:col-start-20 lg:col-span-full'>
        {moviePoster?.media && (
          <SanityImage
            {...moviePoster}
            className='h-full rounded-lg aspect-2/3 lg:h-auto'
          />
        )}
      </div>

      <div className='grid mb-10 lg:row-start-1 lg:col-start-1 lg:col-span-5'>
        <h3 className='text-h-28 uppercase lg:pr-[20%]'>{title}</h3>
      </div>

      <div className='grid gap-6 mb-6 lg:col-start-6 lg:col-span-4 lg:h-fit'>
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
          {actors &&
            actors.map((actor) => <p key={actor._id}>{actor.actor}</p>)}
        </div>
      </div>

      <div className='grid gap-6 mb-6 lg:col-start-10 lg:col-span-3 lg:h-fit'>
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
          <p>{formatDate(releaseDate)}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <h4 className='text-h-12 !font-lato font-bold text-gray uppercase'>
            {durationLabel}
          </h4>
          <p>{duration}</p>
        </div>
      </div>

      <div className='grid gap-6 h-fit lg:col-start-13 lg:col-span-6'>
        <div className='grid gap-2 h-fit'>
          <div className='grid'>
            {description && (
              <RichText
                content={description}
                className='lg:!line-clamp-[9] 2xl:!line-clamp-[12]'
              />
            )}
          </div>

          <div>
            {trailer?.trailerLink?.href && (
              <TrailerOverlay trailerLink={trailer.trailerLink.href} />
            )}
          </div>
        </div>

        <div className='flex gap-6 h-fit'>
          {ticket && (
            <Button
              variant='ticket'
              href={ticket?.ticketLink?.href}
              label={ticket?.ticketLinkLabel ?? 'Biljett'}
            />
          )}
          {button && (
            <div className='flex'>
              <Button
                href={button?.buttonLink?.href ?? ''}
                label={
                  button?.buttonLabel ? button.buttonLabel : 'Pressmaterial'
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionMovieCard;
