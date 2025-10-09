'use client';
import React, { useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
  DotButton,
  useDotButton,
} from '@/components/Media/Carousel/EmblaCarouselDotButton';

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  autoplayOptions?: AutoplayOptionsType;
  showIndicators?: boolean;
};

const HeroCarouselWithIndicators: React.FC<PropType> = ({
  children,
  options,
  autoplayOptions,
  showIndicators = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Setup plugins
  const plugins = [
    autoplayOptions ? Autoplay(autoplayOptions) : undefined,
    WheelGesturesPlugin({ forceWheelAxis: 'x' }),
  ].filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    plugins as NonNullable<(typeof plugins)[number]>[]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className='relative flex flex-col h-full w-full'>
      {/* Carousel container */}
      <div className='flex-1 overflow-hidden' ref={emblaRef}>
        <div className='flex h-full'>{children}</div>
      </div>

      {/* Indicators - absolute on mobile, relative on desktop */}
      {showIndicators && scrollSnaps.length > 1 && (
        <div
          className={`flex justify-center items-center gap-3 py-5 z-20 ${
            isMobile ? 'absolute bottom-0 left-0 right-0' : 'relative'
          }`}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-[3.5px] rounded-[1px] transition-all duration-500 ease-out ${
                index === selectedIndex ? 'bg-white w-12' : 'bg-white/50 w-8'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarouselWithIndicators;
