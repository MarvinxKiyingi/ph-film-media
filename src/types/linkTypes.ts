import type { FetchHeaderResult, LinkType } from '../../sanity.types';

// Type for resolved link data from queries
export type ResolvedLinkType = NonNullable<
  NonNullable<NonNullable<FetchHeaderResult>['linkReference']>[number]['link']
>;

// Union type for link resolver input
export type LinkInput = LinkType | ResolvedLinkType;

// Menu link type
export type MenuLinkType = NonNullable<
  NonNullable<FetchHeaderResult>['linkReference']
>[number];
