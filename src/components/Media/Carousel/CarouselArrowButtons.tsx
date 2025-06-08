import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className='cursor-pointer' type='button' {...restProps}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_465_7242)'>
          <path
            d='M6.5 7.5L7.925 8.9L5.825 11L21 11L21 13L5.825 13L7.9 15.1L6.475 16.5L2 12L6.5 7.5Z'
            fill='var(--color-white)'
            fillOpacity='0.9'
          />
        </g>
        <defs>
          <clipPath id='clip0_465_7242'>
            <rect
              x='24'
              y='24'
              width='24'
              height='24'
              rx='12'
              transform='rotate(-180 24 24)'
              fill='var(--color-white)'
            />
          </clipPath>
        </defs>
      </svg>

      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className='cursor-pointer' type='button' {...restProps}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_465_7245)'>
          <path
            d='M17.5 16.5L16.075 15.1L18.175 13H3V11H18.175L16.1 8.9L17.525 7.5L22 12L17.5 16.5Z'
            fill='var(--color-white)'
            fillOpacity='0.9'
          />
        </g>
        <defs>
          <clipPath id='clip0_465_7245'>
            <rect width='24' height='24' rx='12' fill='var(--color-white)' />
          </clipPath>
        </defs>
      </svg>

      {children}
    </button>
  );
};
