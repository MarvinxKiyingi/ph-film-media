import { NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/live';
import {
  fetchAllPageSlugs,
  fetchAllDistributionMovieSlugs,
  fetchDistributionParentSlug,
} from '@/sanity/lib/queries';

export async function GET(): Promise<NextResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';

  // Fetch all page slugs
  const { data: pages } = await sanityFetch({
    query: fetchAllPageSlugs,
  });
  // Fetch all movie slugs
  const { data: movies } = await sanityFetch({
    query: fetchAllDistributionMovieSlugs,
  });
  // Fetch the parent slug for movies
  const { data: parent } = await sanityFetch({
    query: fetchDistributionParentSlug,
  });
  const movieParentSlug = parent?.slug || 'movies';

  const urls = [
    '', // homepage
    ...pages.map((p) => p.slug),
    ...movies.map((m) => `${movieParentSlug}/${m.slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (slug) =>
      `  <url>\n    <loc>${baseUrl.replace(/\/$/, '')}/${slug?.replace(/^\/+/, '')}</loc>\n  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
