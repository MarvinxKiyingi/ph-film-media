import Parser from 'rss-parser';
import { stripHtml, truncateText } from '@/utils/stripHtml';
import type { ISubstackFeed } from '@/types/IProjectsGrid';

export async function fetchSubstackPosts(): Promise<ISubstackFeed['posts']> {
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

    return posts;
  } catch (error) {
    console.error('Error fetching Substack RSS feed:', error);
    return [];
  }
}

function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/i;
  const match = content.match(imgRegex);
  return match?.[1] || null;
}
