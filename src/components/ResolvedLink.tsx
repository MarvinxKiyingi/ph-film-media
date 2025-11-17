import Link from 'next/link';

import { linkResolver } from '@/sanity/lib/utils';
import type { FetchHeaderResult, LinkType } from '../../sanity.types';

type ResolvedLinkType = NonNullable<
  NonNullable<NonNullable<FetchHeaderResult>['linkReference']>[number]['link']
>;

type LinkInput = LinkType | ResolvedLinkType;

interface ResolvedLinkProps {
  link: LinkInput;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  const resolvedLink = linkResolver(link);

  if (typeof resolvedLink === 'string') {
    const isExternal =
      resolvedLink.startsWith('http://') ||
      resolvedLink.startsWith('https://') ||
      resolvedLink.startsWith('mailto:') ||
      resolvedLink.startsWith('tel:');

    if (isExternal) {
      return (
        <Link
          href={resolvedLink}
          target='_blank'
          rel='noopener noreferrer'
          className={className}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link href={resolvedLink} className={className}>
        {children}
      </Link>
    );
  }

  return <>{children}</>;
}
