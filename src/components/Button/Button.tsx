import React from 'react';
import { Link } from 'next-view-transitions';

interface ButtonProps {
  href?: string | null;
  label?: string | null;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ticket';
}

const Button: React.FC<ButtonProps> = ({
  href,
  label,
  className = '',
  variant = 'secondary',
}) => {
  if (!label) return null;

  const isExternal = href && /^https?:\/\//.test(href);
  const filterClass =
    variant === 'primary'
      ? 'primary-button'
      : variant === 'secondary'
        ? 'secondary-button'
        : variant === 'ticket'
          ? 'ticket-button'
          : `${variant}-button`;
  const buttonClass = `${filterClass} ${className}`;

  if (!href) {
    return (
      <div className={buttonClass}>
        <span>{label}</span>
      </div>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClass}
      >
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass}>
      <span>{label}</span>
    </Link>
  );
};

export default Button;
