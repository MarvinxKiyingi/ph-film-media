import type { Projects } from '../../../../sanity.types';

export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  image: string | null;
};

export type SubstackFeed = {
  title: string;
  description: string;
  posts: SubstackPost[];
};

export type UnifiedProjectItem =
  | {
      type: 'sanity';
      date: string;
      data: Projects;
    }
  | {
      type: 'substack';
      date: string;
      data: SubstackPost;
    };
