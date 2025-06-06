'use client';

import React from 'react';
import CarouselAutoplay from '../Media/Carousel/CarouselAutoplay';
import { SanityImage } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import { BlockListItem } from '@/types/IBlockListItem';
import Button from '../Button/Button';
import { useMediaQuery } from 'react-responsive';

const HeroCarousel = ({ block }: { block: BlockListItem }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  if (block._type !== 'hero') return null;
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
                <SanityImage
                  id={
                    card.cardImage?.media?.asset?._id ||
                    card.cardImage?.media?.asset?._ref ||
                    ''
                  }
                  baseUrl={baseUrl}
                  alt={card.cardImage?.media?.alt || ''}
                  width={
                    card.cardImage?.media?.asset?.metadata?.dimensions?.width ||
                    100
                  }
                  height={
                    card.cardImage?.media?.asset?.metadata?.dimensions
                      ?.height || 100
                  }
                  hotspot={{
                    x: card.cardImage?.media?.hotspot?.x || 0,
                    y: card.cardImage?.media?.hotspot?.y || 0,
                  }}
                  crop={{
                    top: card.cardImage?.media?.crop?.top || 0,
                    left: card.cardImage?.media?.crop?.left || 0,
                    bottom: card.cardImage?.media?.crop?.bottom || 0,
                    right: card.cardImage?.media?.crop?.right || 0,
                  }}
                  // preview={block.logo.media.asset.metadata.lqip || ''}
                  mode='cover'
                  className='rounded-lg aspect-4/5 w-full h-full object-cover lg:rounded-none'
                />

                <Button
                  label={card.buttonLabel}
                  className='absolute bottom-2 right-2 lg:hidden'
                  fill
                />
              </div>

              <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:mb-16 lg:pb-4'>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
                  <div className='flex flex-col gap-2 flex-1'>
                    <h3 className='text-h-base uppercase lg:text-h-lg'>
                      {card.title}
                    </h3>

                    <div
                      key={`info-item-${card.id ?? idx}`}
                      className='flex flex-wrap gap-3 lg:gap-6'
                    >
                      {card.infoItems?.map((item, itemIdx) => (
                        <p
                          key={`info-item-${card.id ?? idx}-${item.id ?? itemIdx}`}
                          className='text-b-sm lg:text-b-base'
                        >
                          {item.infoItemTitle}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className='hidden lg:flex lg:items-end'>
                    <Button label={card.buttonLabel} fill />
                  </div>
                </div>
              </div>
              {/* Bottom fade  */}
              <div className='hidden lg:block absolute bottom-0 w-full h-2/4 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-0' />

              {/* Right fade */}
              <div className='hidden lg:block absolute top-0 right-0 w-2/4 h-full bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none z-0' />
            </Wrapper>
          );
        })}
      </CarouselAutoplay>
    </div>
  );
};

export default HeroCarousel;
