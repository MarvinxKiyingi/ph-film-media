'use client';

import React from 'react';
import CarouselAutoplay from '@/components/Media/Carousel/CarouselAutoplay';
import { BlockListItem } from '@/types/IBlockListItem';
import Button from '@/components/Button/Button';
import { useMediaQuery } from 'react-responsive';
import SanityImage from '@/components/Media/SanityImage';

const HeroCarouselBlock = ({ block }: { block: BlockListItem }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  if (!block || !('mediaCard' in block)) return null;

  // Check if we should disable autoplay on desktop (3 or fewer cards)
  const shouldDisableAutoplay =
    isDesktop && block.mediaCard && block.mediaCard.length <= 3;

  return (
    <CarouselAutoplay
      options={{
        align: isDesktop ? 'start' : 'center',
        loop: true,
      }}
      autoScrollOptions={
        shouldDisableAutoplay
          ? undefined
          : {
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              delay: isDesktop ? 4500 : 3000,
            }
      }
      controlsClassName='!hidden lg:!flex'
    >
      {block.mediaCard?.map((card, idx) => {
        const href =
          card.externalButtonLink?.href ||
          card.internalButtonLink?.slug?.current;
        const Wrapper = href ? 'a' : 'div';
        const wrapperProps = href ? { href } : {};
        return (
          <Wrapper
            {...wrapperProps}
            className={`relative flex flex-col h-full flex-shrink-0 min-w-[85%] px-2 lg:min-w-[33.3333%] max-lg:gap-4 ${idx === 0 ? 'lg:pr-2' : ''}`}
            key={`card-${card.id ?? idx}`}
          >
            <div
              className='relative flex flex-col gap-2 select-none lg:w-full lg:h-full lg:gap-4'
              key={`card-content-${card.id ?? idx}`}
            >
              {card.cardImage && (
                <div className='aspect-4/5 w-full h-full rounded-lg overflow-hidden'>
                  <SanityImage
                    {...card.cardImage}
                    className='w-full h-full object-cover rounded-lg lg:absolute lg:inset-0'
                    aspectRatio='4/5'
                  />
                </div>
              )}
              <Button
                label={card.buttonLabel}
                className='absolute bottom-2 right-2 px-6 py-3 lg:hidden'
                variant='primary'
              />
            </div>

            <div
              className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:pb-4  lg:h-full lg:w-full lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0'
              key={`card-overlay-${card.id ?? idx}`}
            >
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
  );
};

export default HeroCarouselBlock;
