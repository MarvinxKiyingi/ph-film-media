'use client';

const ScrollDownIndicator = ({ inView }: { inView: boolean }) => {
  return (
    <div
      className={`hidden lg:block absolute bottom-12 right-12 bg-white rounded-full p-2 transition-opacity duration-300 ${
        inView ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5 11.6667L5.93333 10.7167L7.33333 12.1167L7.33333 2L8.66667 2L8.66667 12.1167L10.0667 10.7333L11 11.6833L8 14.6667L5 11.6667Z'
          fill='var(--color-black)'
          fillOpacity='0.9'
        />
      </svg>
    </div>
  );
};

export default ScrollDownIndicator;
