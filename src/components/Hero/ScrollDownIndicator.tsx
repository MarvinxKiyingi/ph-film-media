'use client';

const ScrollDownIndicator = ({ inView }: { inView: boolean }) => {
  return (
    <div
      className={`hidden lg:block absolute bottom-12 right-12 bg-white rounded-full p-3 transition-opacity duration-300 ${
        inView ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.5 17.5L8.9 16.075L11 18.175L11 3L13 3L13 18.175L15.1 16.1L16.5 17.525L12 22L7.5 17.5Z'
          fill='black'
          fillOpacity='0.9'
        />
      </svg>
    </div>
  );
};

export default ScrollDownIndicator;
