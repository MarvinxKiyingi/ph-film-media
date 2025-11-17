import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/draft-mode/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

