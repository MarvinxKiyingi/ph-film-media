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
    <div className='relative embla lg:h-screen lg:flex lg:flex-col'>
      <div className='overflow-hidden relative lg:flex-1' ref={emblaRef}>
        <div className='embla__container lg:h-screen '>{children}</div>
      </div>

      <div className={`embla__controls ${controlsClassName} `}>
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
