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

  return (
    <>
      <JsonLd data={orgJsonLd} />

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
    </>
  );
}
