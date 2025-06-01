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
};

const CarouselAutoplay: React.FC<PropType> = (props) => {
  const { children, options, controlsClassName, autoScrollOptions } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoScrollOptions),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className='embla'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>

      <div className={`embla__controls ${controlsClassName}`}>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default CarouselAutoplay;
