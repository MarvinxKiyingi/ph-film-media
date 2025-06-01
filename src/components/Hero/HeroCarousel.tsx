'use client';

import React from 'react';
import CarouselAutoplay from '../Media/Carousel/CarouselAutoplay';
import { SanityImage } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import { BlockListItem } from '@/types/IBlockListItem';
import useMedia from 'use-media';
import Link from 'next/link';

const HeroCarousel = ({ block }: { block: BlockListItem }) => {
  const isDesktop = useMedia({ minWidth: 1024 });
  if (block._type !== 'hero') return null;
  return (
    <div className='lg:col-span-12'>
      <CarouselAutoplay
        options={{ loop: true }}
        autoScrollOptions={{
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          delay: isDesktop ? 5000 : 3000,
        }}
        controlsClassName='!hidden lg:!flex lg:z-10 lg:!absolute lg:left-0 lg:right-0 lg:bottom-0 lg:px-10 lg:pb-10 lg:!mt-0'
        isFade={isDesktop}
      >
        {block.mediaCard?.map((card, idx) => (
          <div
            className='embla__slide max-lg:flex max-lg:flex-col max-lg:gap-5 lg:!flex-none lg:!basis-full lg:grid'
            key={`card-${card.id}-${idx}`}
          >
            <div className='flex flex-col gap-2 lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0'>
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
                  card.cardImage?.media?.asset?.metadata?.dimensions?.height ||
                  100
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
                className='aspect-4/5 w-full h-full object-cover'
              />
            </div>

            <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:mb-16 lg:pb-4'>
              <h3 className='text-h-base uppercase lg:text-h-lg'>
                {card.title}
              </h3>

              <div className='flex flex-col gap-2'>
                <div
                  key={`info-item-${card.id ?? idx}`}
                  className='flex flex-wrap gap-3 lg:gap-6'
                >
                  {card.infoItems?.map((item, itemIdx) => (
                    <p
                      key={`info-item-${card.id ?? idx}-${item.id ?? itemIdx}`}
                      className='text-b-xs lg:text-b-base'
                    >
                      {item.infoItemTitle}
                    </p>
                  ))}
                </div>

                <div>
                  {card.internalButtonLink ? (
                    <Link
                      href={card.internalButtonLink?.slug?.current || ''}
                      className='text-b-xs lg:text-b-base'
                    >
                      {card.internalButtonLink?.title}
                    </Link>
                  ) : (
                    <Link
                      href={card.externalButtonLink?.href || ''}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-b-xs lg:text-b-base'
                    >
                      {card.externalButtonLink?.href}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CarouselAutoplay>
    </div>
  );
};

export default HeroCarousel;
