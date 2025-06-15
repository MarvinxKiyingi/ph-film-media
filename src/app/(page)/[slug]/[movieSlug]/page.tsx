import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { fetchDistributionMovie } from '@/sanity/lib/queries';
import RichText from '@/components/RichText/RichText';
import { token } from '@/sanity/lib/token';
import { FetchDistributionMovieResult } from '../../../../../sanity.types';
import SanityImage from '@/components/Media/SanityImage';
import { generateMetadata } from '@/utils/generateMetadata';

type Props = {
  params: Promise<{ slug: string; movieSlug: string }>;
};

export { generateMetadata };

export default async function MoviePage({ params }: Props) {
  const resolvedParams = await params;
  const { isEnabled } = await draftMode();
  const movie: FetchDistributionMovieResult = await client.fetch(
    fetchDistributionMovie,
    { slug: resolvedParams.movieSlug },
    isEnabled
      ? {
          perspective: 'previewDrafts',
          useCdn: false,
          stega: true,
          token: token,
        }
      : undefined
  );

  if (!movie) {
    console.log('Movie not found for slug:', resolvedParams.movieSlug);
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-6'>{movie.title}</h1>
      {movie.movieBanner?.media && (
        <SanityImage
          {...movie.movieBanner}
          className='h-svh aspect-4/5 lg:aspect-16/9'
        />
      )}
      {movie.moviePoster?.media && (
        <SanityImage {...movie.moviePoster} className='h-full aspect-2/3' />
      )}
      {movie.description && (
        <RichText content={movie.description} className='mb-6' />
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {movie.directors && movie.directors.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-2'>Directors</h2>
            <ul>
              {movie.directors.map((director) => (
                <li key={director._id}>{director.director}</li>
              ))}
            </ul>
          </div>
        )}
        {movie.writers && movie.writers.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-2'>Writers</h2>
            <ul>
              {movie.writers.map((writer) => (
                <li key={writer._id}>{writer.writer}</li>
              ))}
            </ul>
          </div>
        )}
        {movie.actors && movie.actors.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-2'>Actors</h2>
            <ul>
              {movie.actors.map((actor) => (
                <li key={actor._id}>{actor.actor}</li>
              ))}
            </ul>
          </div>
        )}
        {movie.languages && movie.languages.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-2'>Languages</h2>
            <ul>
              {movie.languages.map((language) => (
                <li key={language._id}>{language.language}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
