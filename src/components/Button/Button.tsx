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
  if (!label) return null;

  const isExternal = href && /^https?:\/\//.test(href);
  const filterClass = fill
    ? 'bg-white text-black hover:bg-transparent border border-white hover:border-white hover:text-white'
    : 'bg-transparent text-white border border-white hover:bg-white hover:text-black';
  const buttonClass = `text-b-14 px-6 py-3 leading-[normal] h-fit rounded-[8px] transition-bg duration-300 lg:px-8  lg:text-b-16 ${filterClass} ${className}`;

  if (!href) {
    return <span className={buttonClass}>{label}</span>;
  }

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
