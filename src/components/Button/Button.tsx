import React from 'react';
import { Link } from 'next-view-transitions';
import { linkResolver } from '@/sanity/lib/utils';
import type { ResolvedLinkType } from '@/types/linkTypes';

interface ButtonProps {
  href?: string | null;
  label?: string | null;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ticket';
  linkType?: ResolvedLinkType | null;
}

const Button: React.FC<ButtonProps> = ({
  href,
  label,
  className = '',
  variant = 'secondary',
  linkType,
}) => {
  if (!label) return null;

  // Use linkResolver if linkType provided, otherwise fall back to href prop
  const resolvedHref = linkType ? linkResolver(linkType) : href;
  const isExternal =
    resolvedHref && /^https?:\/\/|^mailto:|^tel:/.test(resolvedHref);

  const filterClass =
    variant === 'primary'
      ? 'primary-button'
      : variant === 'secondary'
        ? 'secondary-button'
        : variant === 'ticket'
          ? 'ticket-button'
          : `${variant}-button`;
  const buttonClass = `${filterClass} ${className}`;

  if (!resolvedHref) {
    return (
      <div className={buttonClass}>
        <span>{label}</span>
      </div>
    );
  }

  if (isExternal) {
    return (
      <a
        href={resolvedHref}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClass}
      >
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={buttonClass}>
      <span>{label}</span>
    </Link>
  );
};

export default Button;
