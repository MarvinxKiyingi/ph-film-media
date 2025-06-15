import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import {
  fetchDistributionMovie,
  settingsQuery,
  fetchAllDistributionMovieSlugs,
  fetchDistributionParentSlug,
} from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import {
  FetchDistributionMovieResult,
  SettingsQueryResult,
} from '../../../../../sanity.types';
import { generateMetadata } from '@/utils/generateMetadata';
import MovieDetailHero from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetailHero';
import MovieDetail from '@/components/Blocks/DistributionList/DistributionMovieDetail/MovieDetail';

type Props = {
  params: Promise<{ slug: string; movieSlug: string }>;
};

export { generateMetadata };

export async function generateStaticParams() {
  const [slugs, parentSlug] = await Promise.all([
    client.fetch(fetchAllDistributionMovieSlugs),
    client.fetch(fetchDistributionParentSlug),
  ]);

  if (!parentSlug?.slug) {
    console.error('No parent distribution page found');
    return [];
  }

  return slugs.map(({ slug }) => ({
    slug: parentSlug.slug,
    movieSlug: slug,
  }));
}

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

  const settings = await client.fetch<SettingsQueryResult>(settingsQuery);

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
