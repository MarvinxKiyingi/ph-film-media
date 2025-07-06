import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { fetchAllPageSlugs, fetchHome } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { generateMetadata } from '@/utils/generateMetadata';
import { FetchHomeResult } from '../../../sanity.types';
import Hero from '@/components/Blocks/Hero/index';
import MediaCarousel from '@/components/Blocks/MediaCarousel';
import MovieClubList from '@/components/Blocks/MovieClubList';
import MovieHero from '@/components/Blocks/MovieHero';
import ImageWithText from '@/components/Blocks/ImageWithText';
import LogoCarousel from '@/components/Blocks/LogoCarousel';
import PageTitle from '@/components/Blocks/PageTitle';

export { generateMetadata };

type IHomePageBlockListItem = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number];

export async function generateStaticParams() {
  const slugs = await client.fetch(fetchAllPageSlugs);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const data: FetchHomeResult = await client.fetch(
    fetchHome,
    { slug: '/' },
    isEnabled
      ? {
          perspective: 'previewDrafts',
          useCdn: false,
          stega: true,
          token: token,
        }
      : undefined
  );

  if (!data || !data.blockList) return null;

  const firstBlock = data.blockList[0];
  const isHero =
    firstBlock && '_type' in firstBlock && firstBlock._type === 'hero';

  return (
    <div
      className={`grid grid-cols-1 gap-8 pt-52 ${isHero ? 'lg:pt-0' : 'lg:pt-48'}`}
    >
      {data.blockList.map((block: IHomePageBlockListItem, idx) => {
        if (!block || !('_type' in block)) return null;

        switch (block._type) {
          case 'hero':
            return <Hero key={idx} block={block} idx={idx} />;
          case 'pageTitle':
            return <PageTitle key={idx} {...block} />;
          case 'mediaCarousel':
            return <MediaCarousel key={idx} {...block} />;
          case 'movieClubList':
            return <MovieClubList key={idx} {...block} />;
          case 'movieHero':
            return <MovieHero key={idx} {...block} />;
          case 'imageWithText':
            return <ImageWithText key={idx} {...block} />;
          case 'logoCarousel':
            return <LogoCarousel key={idx} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
