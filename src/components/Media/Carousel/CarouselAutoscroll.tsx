'use client';
import React, { useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { AutoplayOptionsType } from 'embla-carousel-autoplay';

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  autoScrollOptions?: AutoplayOptionsType;
  containerClassNameOverride?: string;
};

const CarouselAutoscroll: React.FC<PropType> = (props) => {
  const { children, options, autoScrollOptions, containerClassNameOverride } =
    props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll(autoScrollOptions),
  ]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
  }, [emblaApi]);

  return (
    <div className=''>
      <div className='overflow-hidden' ref={emblaRef}>
        <div
          className={`grid grid-flow-col [grid-auto-columns:45%] gap-2 ${containerClassNameOverride}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CarouselAutoscroll;
