import React from 'react';

type PlayIconProps = {
  color?: string;
};

const PlayIcon = ({ color = 'var(--color-white)' }: PlayIconProps) => {
  return (
    <svg
      className='w-16 h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.9375 2.1875C28.5139 14.7511 51.0902 27.3147 73.75 39.9141C59.9348 47.6144 46.1911 55.2789 32.3998 62.9672L5.9375 77.7718V2.1875Z'
        stroke={color}
        strokeWidth='2.38399'
        strokeMiterlimit='10'
      />
    </svg>
  );
};

export default PlayIcon;
