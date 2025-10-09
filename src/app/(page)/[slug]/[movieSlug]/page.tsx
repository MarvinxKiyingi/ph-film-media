import { sanityFetch } from '@/sanity/lib/live';
import { fetchDistributionMovie, settingsQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import type {
  FetchDistributionMovieResult,
  SettingsQueryResult,
} from '../../../../../sanity.types';
import { getMovieJsonLd } from '@/utils/jsonld';
import JsonLd from '@/components/JsonLd';
import MovieDetailHero from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetailHero';
import MovieDetail from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetail';

export { generateMetadata };

type Props = {
  params: Promise<{ slug: string; movieSlug: string }>;
};

export default async function MoviePage({ params }: Props) {
  const resolvedParams = await params;

  const { data: movie }: { data: FetchDistributionMovieResult } =
    await sanityFetch({
      query: fetchDistributionMovie,
      params: { slug: resolvedParams.movieSlug },
    });

  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });

  if (!movie) {
    console.log('Movie not found for slug:', resolvedParams.movieSlug);
    notFound();
  }

  // JSON-LD structured data for Movie
  const movieJsonLd = getMovieJsonLd({
    title: movie.title || '',
    description:
      typeof movie.description === 'string' ? movie.description : undefined,
    datePublished: movie.releaseDate || undefined,
    duration: movie.duration || undefined,
    actors: movie.actors?.map((a) => ({ name: a.actor })),
    directors: movie.directors?.map((d) => ({ name: d.director })),
    image: movie.moviePoster?.media?.asset?.url,
  });

  return (
    <>
      <JsonLd data={movieJsonLd} />

      <MovieDetailHero {...movie} />
      <MovieDetail movie={movie} settings={settings} />
    </>
  );
}
