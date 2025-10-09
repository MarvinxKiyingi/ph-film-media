import { IMenuLink } from './DesktopMenuBar';

export const getLinkHref = (linkData: IMenuLink): string => {
  if (linkData.link?.linkType === 'internalLink') {
    return `/${linkData.link?.internalLink?.slug?.current || ''}`;
  }
  return linkData.link?.externalLink || '';
};

export const getLinkText = (linkData: IMenuLink): string => {
  if (linkData.link?.linkType === 'internalLink') {
    return linkData.link?.internalLink?.pageTitle || linkData.label || '';
  }
  return linkData.label || '';
};

export const getLinkTarget = (linkData: IMenuLink): string | undefined => {
  return linkData.link?.linkType === 'externalLink' ? '_blank' : undefined;
};

export const getLinkRel = (linkData: IMenuLink): string | undefined => {
  return linkData.link?.linkType === 'externalLink'
    ? 'noopener noreferrer'
    : undefined;
};

export const generateLinkClasses = (
  isActive: boolean,
  pathname: string,
  baseClassesOverride?: string
): string => {
  const isHomePage = pathname === '/';

  const baseClasses = `transition-colors duration-300 hover:text-white leading-[normal] ${baseClassesOverride || ''}`;

  const colorClasses =
    isHomePage || isActive
      ? 'text-white group-hover:text-gray-500'
      : 'text-gray-500';

  return `${baseClasses} ${colorClasses}`;
};

export const isLinkActive = (
  pathname: string,
  linkData: IMenuLink
): boolean => {
  if (linkData.link?.linkType === 'internalLink') {
    const slug = `/${linkData.link?.internalLink?.slug?.current || ''}`;

    if (slug === '/') {
      return pathname === '/';
    }

    return pathname === slug || pathname.startsWith(slug + '/');
  }
  return false;
};
