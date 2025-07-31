import { sanityFetch } from '@/sanity/lib/live';
import { fetchHome } from '@/sanity/lib/queries';
import { generateMetadata } from '@/utils/generateMetadata';
import { FetchHomeResult } from '../../../sanity.types';
import HeroCarouselBlock from '@/components/Blocks/HeroCarousel/index';
import MediaCarousel from '@/components/Blocks/MediaCarousel';
import MovieClubList from '@/components/Blocks/MovieClubList';
import ImageWithText from '@/components/Blocks/ImageWithText';
import LogoCarousel from '@/components/Blocks/LogoCarousel';
import PageTitle from '@/components/Blocks/PageTitle';
import MoviesHeroCarousel from '@/components/Blocks/MoviesHeroCarousel';
import JsonLd from '@/components/JsonLd';
import { getOrganizationJsonLd } from '@/utils/jsonld';

export { generateMetadata };

type IHomePageBlockListItem = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number];

export default async function HomePage() {
  const { data }: { data: FetchHomeResult } = await sanityFetch({
    query: fetchHome,
    params: { slug: '/' },
  });

  if (!data || !data.blockList) return null;

  // JSON-LD structured data for Organization
  const orgJsonLd = getOrganizationJsonLd({
    name: data.pageTitle || 'PH Film Media',
    url:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
      'http://localhost:3000',
  });

  const firstBlock = data.blockList[0];
  const isHero =
    firstBlock && '_type' in firstBlock && firstBlock._type === 'heroCarousel';

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <div
        className={`grid grid-cols-1 gap-8 pt-52 ${isHero ? 'lg:pt-0' : 'lg:pt-48'}`}
      >
        {data.blockList.map((block: IHomePageBlockListItem, idx) => {
          if (!block || !('_type' in block)) return null;

          switch (block._type) {
            case 'heroCarousel':
              return <HeroCarouselBlock key={idx} block={block} idx={idx} />;
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
            default:
              return null;
          }
        })}
      </div>
    </>
  );
}
