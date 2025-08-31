'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import CarouselAutoplay from '@/components/Media/Carousel/CarouselAutoplay';
import { BlockListItem } from '@/types/IBlockListItem';
import Button from '@/components/Button/Button';
import SanityImage from '@/components/Media/SanityImage';

// Animation configuration
const CARD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
    },
  },
};

// Animation queue management
const useAnimationQueue = () => {
  const [animatedCards, setAnimatedCards] = React.useState<Set<number>>(
    new Set()
  );
  const hasAnimated = useRef(false);

  const startAnimations = React.useCallback((totalCards: number) => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    Array.from({ length: totalCards }, (_, i) =>
      setTimeout(
        () => setAnimatedCards((prev) => new Set([...prev, i])),
        i * 200
      )
    );
  }, []);

  return { animatedCards, startAnimations };
};

// Individual card component
const HeroCardWithAnimation = ({
  card,
  index,
  variants,
  isAnimated,
  isDesktop,
}: {
  card: NonNullable<
    Extract<BlockListItem, { _type: 'heroCarousel' }>['mediaCard']
  >[number];
  index: number;
  variants: Variants;
  isAnimated: boolean;
  isDesktop: boolean;
}) => {
  const href =
    card.externalButtonLink?.href || card.internalButtonLink?.slug?.current;
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};
  const cardContent = (
    <Wrapper
      {...wrapperProps}
      className={`relative flex flex-col h-full flex-shrink-0 min-w-[85%] mr-2 lg:min-w-[33.3333%] max-lg:gap-4`}
      data-sanity-edit-target
    >
      <div className='relative flex flex-col gap-2 select-none lg:w-full lg:h-full lg:gap-4'>
        {card.cardImage && (
          <div className='aspect-4/5 w-full h-full rounded-lg overflow-hidden'>
            <SanityImage
              {...card.cardImage}
              className='w-full h-full object-cover rounded-lg absolute inset-0'
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

      <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:pb-4 lg:h-full lg:w-full lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0'>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <div className='flex flex-col gap-2 flex-1'>
            <h3 className='text-h-21 uppercase lg:text-h-28'>{card.title}</h3>
            <div className='flex flex-wrap gap-3 lg:gap-6'>
              {card.infoItems?.map((item, itemIdx: number) => (
                <p
                  key={`info-item-${card.id ?? index}-${item.id ?? itemIdx}`}
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

  return isDesktop ? (
    <motion.div
      key={`motion-card-${card.id ?? index}`}
      variants={variants}
      initial='hidden'
      animate={isAnimated ? 'visible' : 'hidden'}
    >
      {cardContent}
    </motion.div>
  ) : (
    <div key={`static-card-${card.id ?? index}`}>{cardContent}</div>
  );
};

// Custom hook to avoid hydration issues
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let resizeTimeout: NodeJS.Timeout;
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    const debouncedCheck = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIsDesktop, 100);
    };

    checkIsDesktop();
    window.addEventListener('resize', debouncedCheck);
    return () => {
      window.removeEventListener('resize', debouncedCheck);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return isMounted ? isDesktop : false;
};

const HeroCarouselBlock = ({ block }: { block: BlockListItem }) => {
  const isDesktop = useIsDesktop();
  const { animatedCards, startAnimations } = useAnimationQueue();
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    if (isDesktop && 'mediaCard' in block && block.mediaCard?.length) {
      startAnimations(block.mediaCard.length);
      setTimeout(() => setIsReady(true), 50);
    } else if (!isDesktop) {
      setIsReady(true);
    }
  }, [block, startAnimations, isDesktop]);

  if (!block || !('mediaCard' in block)) return null;

  if (!isReady) {
    return (
      <div className='relative lg:flex lg:flex-col lg:h-full lg:w-full lg:gap-4 lg:overflow-hidden'>
        <div className='flex flex-col gap-4 lg:flex-1'>
          <div className='overflow-hidden h-full'>
            <div className='flex h-full'>
              {block.mediaCard?.map((card, idx) => (
                <div
                  key={`hero-card-${card.id ?? idx}`}
                  className='relative flex flex-col h-full flex-shrink-0 min-w-[85%] mr-2 lg:min-w-[33.3333%] max-lg:gap-4 opacity-0'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shouldDisableAutoplay =
    isDesktop && block.mediaCard && block.mediaCard.length <= 3;

  return (
    <CarouselAutoplay
      options={{
        align: isDesktop ? 'start' : 'center',
        loop: true,
        skipSnaps: !isReady,
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
      {block.mediaCard?.map((card, idx) =>
        isDesktop ? (
          <HeroCardWithAnimation
            key={`hero-card-${card.id ?? idx}`}
            card={card}
            index={idx}
            variants={CARD_VARIANTS}
            isAnimated={animatedCards.has(idx)}
            isDesktop={isDesktop}
          />
        ) : (
          // Mobile: Direct rendering without animation wrapper
          <div
            key={`hero-card-${card.id ?? idx}`}
            className={`relative flex flex-col h-full flex-shrink-0 min-w-[85%] mr-2 lg:min-w-[33.3333%] max-lg:gap-4`}
          >
            {(() => {
              const href =
                card.externalButtonLink?.href ||
                card.internalButtonLink?.slug?.current;
              const Wrapper = href ? 'a' : 'div';
              const wrapperProps = href ? { href } : {};

              return (
                <Wrapper {...wrapperProps} data-sanity-edit-target>
                  <div className='relative flex flex-col gap-2 select-none lg:w-full lg:h-full lg:gap-4'>
                    {card.cardImage && (
                      <div className='aspect-4/5 w-full h-full rounded-lg overflow-hidden'>
                        <SanityImage
                          {...card.cardImage}
                          className='w-full h-full object-cover rounded-lg absolute inset-0'
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

                  <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:pb-4 lg:h-full lg:w-full lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
                      <div className='flex flex-col gap-2 flex-1'>
                        <h3 className='text-h-21 uppercase lg:text-h-28'>
                          {card.title}
                        </h3>
                        <div className='flex flex-wrap gap-3 lg:gap-6'>
                          {card.infoItems?.map((item, itemIdx: number) => (
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
            })()}
          </div>
        )
      )}
    </CarouselAutoplay>
  );
};

export default HeroCarouselBlock;
