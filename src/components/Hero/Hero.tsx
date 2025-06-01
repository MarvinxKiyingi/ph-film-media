import { BlockListItem } from '@/types/IBlockListItem';
import React from 'react';
import { SanityImage } from 'sanity-image';
import { baseUrl } from '@/sanity/lib/utils';
import CarouselAutoplay from '../Media/Carousel/CarouselAutoplay';

const Hero = ({ block, idx }: { block: BlockListItem; idx: number }) => {
  if (block._type !== 'hero') return null;

  return (
    <div key={idx} className='flex flex-col gap-5'>
      <h2 aria-label='Ph Film & Media' className='px-5'>
        {block.logo?.media &&
          block.logo.media.asset &&
          block.logo.media.asset.metadata && (
            <SanityImage
              id={
                block.logo.media.asset._id || block.logo.media.asset._ref || ''
              }
              baseUrl={baseUrl}
              alt={block.logo.media.alt || ''}
              width={block.logo.media.asset.metadata.dimensions?.width || 100}
              height={block.logo.media.asset.metadata.dimensions?.height || 100}
              hotspot={{
                x: block.logo.media.hotspot?.x || 0,
                y: block.logo.media.hotspot?.y || 0,
              }}
              crop={{
                top: block.logo.media.crop?.top || 0,
                left: block.logo.media.crop?.left || 0,
                bottom: block.logo.media.crop?.bottom || 0,
                right: block.logo.media.crop?.right || 0,
              }}
              // preview={block.logo.media.asset.metadata.lqip || ''}
              mode='cover'
              className='aspect-5/2 w-full'
              queryParams={{ q: 90 }}
            />
          )}
      </h2>

      <CarouselAutoplay
        options={{ loop: true }}
        autoScrollOptions={{
          playOnInit: true,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          delay: 5000,
        }}
        controlsClassName='!hidden lg:!flex'
      >
        {block.mediaCard?.map((card, idx) => (
          <div
            className='embla__slide max-lg:flex max-lg:flex-col max-lg:gap-5  '
            key={`card-${card.id}-${idx}`}
          >
            <div className='flex flex-col gap-2'>
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

            <div className='flex flex-col gap-2'>
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
                    className='text-b-xs lg:text-b-base'
                  >
                    {item.infoItemTitle}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CarouselAutoplay>
    </div>
  );
};

export default Hero;
