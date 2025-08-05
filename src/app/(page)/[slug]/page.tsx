import { sanityFetch } from '@/sanity/lib/live';
import { fetchPage } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import MediaCarousel from '@/components/Blocks/MediaCarousel';
import ImageWithText from '@/components/Blocks/ImageWithText';
import LogoCarousel from '@/components/Blocks/LogoCarousel';
import MovieClubList from '@/components/Blocks/MovieClubList';
import DistributionList from '@/components/Blocks/DistributionList';
import MoviesHeroCarousel from '@/components/Blocks/MoviesHeroCarousel';
import type { FetchPageResult } from '../../../../sanity.types';
import PageTitle from '@/components/Blocks/PageTitle';

export { generateMetadata };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data }: { data: FetchPageResult } = await sanityFetch({
    query: fetchPage,
    params: { slug },
  });

  if (!data) {
    notFound();
  }

  return (
    <main
      id='page-main-content'
      className='flex flex-col flex-1 pt-[20vh] mt-[var(--header-height-mobile)] lg:mt-[var(--header-height-desktop)]'
    >
      <div className='grid grid-cols-1'>
        {data.blockList?.map((block, idx) => {
          if (!('_type' in block)) return null;
          switch (block._type) {
            case 'pageTitle':
              return <PageTitle key={idx} {...block} />;
            case 'mediaCarousel':
              return <MediaCarousel key={idx} {...block} />;
            case 'movieClubList':
              return <MovieClubList key={idx} {...block} />;
            case 'moviesHeroCarousel':
              return <MoviesHeroCarousel key={idx} {...block} />;
            case 'imageWithText':
              return <ImageWithText key={idx} {...block} />;
            case 'logoCarousel':
              return <LogoCarousel key={idx} {...block} />;
            case 'distributionList':
              return (
                <DistributionList key={idx} block={block} slug={data.slug} />
              );
            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}
