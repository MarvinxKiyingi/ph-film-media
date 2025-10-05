import { FetchHeaderResult } from '../../../../sanity.types';

export type IDesktopMenuBar = {
  header: FetchHeaderResult;
  baseClassesOverride?: string;
};

export type IMenuLink = NonNullable<
  NonNullable<FetchHeaderResult>['linkReference']
>[number];

export type ILinkProps = {
  link: IMenuLink;
  isActive: boolean;
  baseClassesOverride?: string;
};
