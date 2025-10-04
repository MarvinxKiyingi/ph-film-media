import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { stripHtml, truncateText } from '@/utils/stripHtml';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  try {
    const parser = new Parser({
      customFields: {
        item: [['content:encoded', 'contentEncoded']],
      },
    });

    const feed = await parser.parseURL('https://phfilmedia.substack.com/feed');

    const posts = feed.items.map((item) => {
      const enclosureUrl = item.enclosure?.url || null;
      const image = enclosureUrl || extractImageFromContent(item.content || '');

      const itemWithCustomFields = item as typeof item & {
        contentEncoded?: string;
      };

      const fullContent =
        itemWithCustomFields.contentEncoded || item.content || '';
      const cleanText = stripHtml(fullContent);
      const description = truncateText(cleanText, 350);

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        contentSnippet: description,
        content: item.content || '',
        image,
      };
    });

    return NextResponse.json({
      title: feed.title,
      description: feed.description,
      posts,
    });
  } catch (error) {
    console.error('Error fetching Substack RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack feed' },
      { status: 500 }
    );
  }
}

function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/i;
  const match = content.match(imgRegex);
  return match?.[1] || null;
}
