import React from 'react';
import Link from 'next/link';
import TicketButton from './TicketButton';

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

  const isExternal = href && /^(https?:\/\/)?(www\.)/.test(href);
  const filterClass =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-transparent border border-white hover:border-white hover:text-white'
      : variant === 'secondary'
        ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
        : 'bg-transparent text-white border border-white hover:bg-white hover:text-black';
  const buttonClass = `text-b-14 px-6 py-3 leading-[normal] h-fit rounded-[8px] transition-bg duration-300 whitespace-nowrap lg:px-8 lg:text-b-16 ${filterClass} ${className}`;

  if (!href) {
    return <span className={buttonClass}>{label}</span>;
  }

  if (variant === 'ticket') {
    return (
      <Link href={href} target='_blank' rel='noopener noreferrer'>
        <TicketButton
          label={label}
          bgColor={'var(--color-white)'}
          textColor={'var(--color-black)'}
        />
      </Link>
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
