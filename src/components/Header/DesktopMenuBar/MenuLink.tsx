'use client';

import React from 'react';
import { ILinkProps } from './DesktopMenuBar';
import { getLinkText, generateLinkClasses } from './utils';
import ResolvedLink from '@/components/ResolvedLink';
import type { LinkInput } from '@/types/linkTypes';

const MenuLink: React.FC<ILinkProps> = ({
  link,
  isActive,
  baseClassesOverride,
}) => {
  const text = getLinkText(link);
  const className = generateLinkClasses(isActive, baseClassesOverride);

  return (
    <li className={`flex py-2.5 w-full ${className}`}>
      <ResolvedLink link={link.link as LinkInput}>{text}</ResolvedLink>
    </li>
  );
};

export default MenuLink;
