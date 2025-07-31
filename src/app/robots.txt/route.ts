import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';
  const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl.replace(/\/$/, '')}/sitemap.xml`;
  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
