import type { SubstackFeed } from '@/components/Blocks/ProjectsGrid/types';

export async function fetchSubstackPosts(): Promise<SubstackFeed['posts']> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/substack`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('Failed to fetch Substack posts:', response.statusText);
      return [];
    }

    const feed: SubstackFeed = await response.json();
    return feed.posts;
  } catch (error) {
    console.error('Error loading Substack posts:', error);
    return [];
  }
}
