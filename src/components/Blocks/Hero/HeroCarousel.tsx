'use client';

import React from 'react';
import CarouselAutoplay from '@/components/Media/Carousel/CarouselAutoplay';
import { BlockListItem } from '@/types/IBlockListItem';
import Button from '@/components/Button/Button';
import { useMediaQuery } from 'react-responsive';
import SanityImage from '@/components/Media/SanityImage';

const HeroCarousel = ({ block }: { block: BlockListItem }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  if (!block || !('mediaCard' in block)) return null;
  return (
    <div className='relative lg:col-span-12'>
      <CarouselAutoplay
        options={{ loop: true }}
        autoScrollOptions={{
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          delay: isDesktop ? 4500 : 3000,
        }}
        controlsClassName='!hidden lg:!flex lg:z-10 lg:!absolute lg:left-0 lg:right-0 lg:bottom-0 lg:px-10 lg:pb-10 lg:!mt-0'
        isFade={isDesktop}
      >
        {block.mediaCard?.map((card, idx) => {
          const href =
            card.externalButtonLink?.href ||
            card.internalButtonLink?.slug?.current;
          const Wrapper = href ? 'a' : 'div';
          const wrapperProps = href
            ? {
                href,
                className:
                  'embla__slide max-lg:flex max-lg:flex-col max-lg:gap-5 lg:!flex-none lg:!basis-full lg:grid lg:cursor-pointer lg:active:cursor-grabbing',
              }
            : {
                className:
                  'embla__slide max-lg:flex max-lg:flex-col max-lg:gap-5 lg:!flex-none lg:!basis-full lg:grid lg:cursor-grab lg:active:cursor-grabbing',
              };
          return (
            <Wrapper key={`card-${card.id}-${idx}`} {...wrapperProps}>
              <div className='relative flex flex-col gap-2 lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0 select-none'>
                {card.cardImage && (
                  <SanityImage
                    {...card.cardImage}
                    className='rounded-lg aspect-4/5 h-full lg:rounded-none'
                  />
                )}

                <Button
                  label={card.buttonLabel}
                  className='absolute bottom-2 right-2 px-6 py-3 lg:hidden'
                  variant='primary'
                />
              </div>

              <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:mb-16 lg:pb-4'>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
                  <div className='flex flex-col gap-2 flex-1'>
                    <h3 className='text-h-21 uppercase lg:text-h-28'>
                      {card.title}
                    </h3>

                    <div
                      key={`info-item-${card.id ?? idx}`}
                      className='flex flex-wrap gap-3 lg:gap-6'
                    >
                      {card.infoItems?.map((item, itemIdx) => (
                        <p
                          key={`info-item-${card.id ?? idx}-${item.id ?? itemIdx}`}
                          className='text-b-12 lg:text-b-16'
                        >
                          {item.infoItemTitle}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className='hidden lg:flex lg:items-end'>
                    <Button
                      label={card.buttonLabel}
                      variant='primary'
                      className='px-6 py-3'
                    />
                  </div>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </CarouselAutoplay>
    </div>
  );
};

export default HeroCarousel;
