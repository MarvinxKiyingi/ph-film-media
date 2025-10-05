import type { FetchAllProjectsResult } from '../../sanity.types';

export type ISubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  image: string | null;
};

export type ISubstackFeed = {
  title: string;
  description: string;
  posts: ISubstackPost[];
};

export type IUnifiedProjectItem =
  | {
      type: 'sanity';
      date: string;
      data: FetchAllProjectsResult[number];
    }
  | {
      type: 'substack';
      date: string;
      data: ISubstackPost;
    };
