import { sanityFetch } from '@/sanity/lib/live';
import { notFound } from 'next/navigation';
import { fetchDistributionMovie, settingsQuery } from '@/sanity/lib/queries';
import { FetchDistributionMovieResult } from '../../../../../sanity.types';
import { generateMetadata } from '@/utils/generateMetadata';
import MovieDetailHero from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetailHero';
import MovieDetail from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetail';

type Props = {
  params: Promise<{ slug: string; movieSlug: string }>;
};

export { generateMetadata };

export default async function MoviePage({ params }: Props) {
  const resolvedParams = await params;
  const { data: movie }: { data: FetchDistributionMovieResult } =
    await sanityFetch({
      query: fetchDistributionMovie,
      params: { slug: resolvedParams.movieSlug },
    });

  const { data: settings } = await sanityFetch({ query: settingsQuery });

  if (!movie) {
    console.log('Movie not found for slug:', resolvedParams.movieSlug);
    notFound();
  }

  return (
    <main
      id='movie-main-content'
      className='relative flex flex-col flex-1 lg:pt-[20vh] lg:mt-[var(--header-height-desktop)]'
    >
      <MovieDetailHero {...movie} />
      <MovieDetail movie={movie} settings={settings} />
    </main>
  );
}
