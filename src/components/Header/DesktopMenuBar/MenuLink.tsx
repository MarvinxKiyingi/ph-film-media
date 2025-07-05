'use client';

import { Link } from 'next-view-transitions';
import React from 'react';
import { ILinkProps } from './DesktopMenuBar';
import {
  getLinkHref,
  getLinkText,
  getLinkTarget,
  getLinkRel,
  generateLinkClasses,
} from './utils';

const MenuLink: React.FC<ILinkProps> = ({
  link,
  isActive,
  baseClassesOverride,
}) => {
  const href = getLinkHref(link);
  const text = getLinkText(link);
  const target = getLinkTarget(link);
  const rel = getLinkRel(link);
  const className = generateLinkClasses(isActive, baseClassesOverride);

  return (
    <li className='flex'>
      <Link href={href} target={target} rel={rel} className={className}>
        {text}
      </Link>
    </li>
  );
};

export default MenuLink;
