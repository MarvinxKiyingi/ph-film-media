import { sanityFetch } from '@/sanity/lib/live';
import { fetchHome } from '@/sanity/lib/queries';
import { generateMetadata } from '@/utils/generateMetadata';
import type { FetchHomeResult } from '../../../sanity.types';
import BlockRenderer from '@/components/PageBuilder/BlockRenderer';
import JsonLd from '@/components/JsonLd';
import { getOrganizationJsonLd } from '@/utils/jsonld';

export { generateMetadata };

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
        className={`grid grid-cols-1 gap-8 pt-[22%] ${isHero ? 'lg:pt-0' : 'lg:pt-48'}`}
      >
        {data.blockList.map((block, idx) => {
          if (!('_type' in block)) return null;
          return (
            <BlockRenderer
              key={'_key' in block ? block._key : idx}
              block={block}
              index={idx}
              slug={data.slug || undefined}
            />
          );
        })}
      </div>
    </>
  );
}
