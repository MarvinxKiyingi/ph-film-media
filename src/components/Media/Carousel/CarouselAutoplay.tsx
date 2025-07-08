'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './CarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { SelectedSnapDisplay } from './SelectedSnapDisplay';
import { useSelectedSnapDisplay } from './SelectedSnapDisplay';

// type Slide = NonNullable<
//   Extract<
//     NonNullable<NonNullable<FetchHomeResult>['blockList']>[number],
//     { _type: 'hero' }
//   >['mediaCard']
// >[number];

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  controlsClassName?: string;
  autoScrollOptions?: AutoplayOptionsType;
  isFade?: boolean;
};

const CarouselAutoplay: React.FC<PropType> = (props) => {
  const {
    children,
    options,
    controlsClassName,
    autoScrollOptions,
    isFade = false,
  } = props;
  const plugins = [
    Autoplay(autoScrollOptions),
    isFade ? Fade() : undefined,
    WheelGesturesPlugin({ forceWheelAxis: 'x' }),
  ].filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    plugins as NonNullable<(typeof plugins)[number]>[]
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <div className='relative lg:flex lg:flex-col lg:h-full lg:w-full lg:gap-4 lg:overflow-hidden'>
      <div className='flex flex-col gap-4 lg:flex-1'>
        <div className='overflow-hidden h-full' ref={emblaRef}>
          <div className='flex h-full'>{children}</div>
        </div>
      </div>

      <div className={`flex justify-between ${controlsClassName} `}>
        {/* {appendTextToControls && appendTextToControls} */}

        <div className='flex gap-6 items-center'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </div>
  );
};

export default CarouselAutoplay;
