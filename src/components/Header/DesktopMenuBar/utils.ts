import { IMenuLink } from './DesktopMenuBar';

export const getLinkHref = (link: IMenuLink): string => {
  if (link._type === 'internalLink') {
    return `/${link.page?.slug?.current || ''}`;
  }
  return link.link?.href || '';
};

export const getLinkText = (link: IMenuLink): string => {
  if (link._type === 'internalLink') {
    return link.linkLabel || link.page?.pageTitle || '';
  }
  return link.linkLabel || '';
};

export const getLinkTarget = (link: IMenuLink): string | undefined => {
  return link._type === 'externalLink' ? '_blank' : undefined;
};

export const getLinkRel = (link: IMenuLink): string | undefined => {
  return link._type === 'externalLink' ? 'noopener noreferrer' : undefined;
};

export const generateLinkClasses = (
  isActive: boolean,
  baseClassesOverride?: string
): string => {
  const baseClasses = `transition-colors duration-300 lg:pl-8 hover:text-white leading-[normal] ${baseClassesOverride || ''}`;
  const colorClasses = isActive
    ? 'text-white'
    : 'text-white group-hover:text-gray-500';

  return `${baseClasses} ${colorClasses}`;
};

export const isLinkActive = (pathname: string, link: IMenuLink): boolean => {
  if (link._type === 'internalLink') {
    const slug = `/${link.page?.slug?.current || ''}`;
    return pathname === slug;
  }
  return false;
};
