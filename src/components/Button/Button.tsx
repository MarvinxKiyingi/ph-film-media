import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string | null;
  label?: string | null;
  className?: string;
  fill?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  href,
  label,
  className = '',
  fill = false,
}) => {
  if (!label || !href) return null;

  const isExternal = /^https?:\/\//.test(href);
  const filterClass = fill
    ? 'bg-white text-black'
    : 'bg-transparent text-white border border-white';
  const buttonClass = `text-b-sm lg:text-b-base px-8 py-4 rounded-[8px] ${filterClass} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={buttonClass}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass}>
      {label}
    </Link>
  );
};

export default Button;
