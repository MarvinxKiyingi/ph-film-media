'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import MovieClubCard from './MovieClubCard';
import { useIsDesktop } from '../../../utils/isDesktop';

export type IMovieClubListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieClubList' }
>;

// Animation configuration
const CARD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    },
  },
};

// Animation queue management
const useAnimationQueue = () => {
  const [animatedCards, setAnimatedCards] = React.useState<Set<number>>(
    new Set()
  );
  const animationQueue = useRef<number[]>([]);
  const isAnimating = useRef(false);

  const processAnimationQueue = React.useCallback(() => {
    if (animationQueue.current.length === 0) {
      isAnimating.current = false;
      return;
    }

    isAnimating.current = true;
    const nextIndex = animationQueue.current.shift()!;

    setAnimatedCards((prev) => new Set([...prev, nextIndex]));

    // Wait for animation duration before processing next
    setTimeout(() => {
      processAnimationQueue();
    }, 150); // Reduced stagger delay for faster sequence
  }, []);

  const handleCardInView = React.useCallback(
    (index: number) => {
      if (animatedCards.has(index)) return;

      // Add to queue
      if (!animationQueue.current.includes(index)) {
        animationQueue.current.push(index);
      }

      // Process queue if not already animating
      if (!isAnimating.current) {
        processAnimationQueue();
      }
    },
    [animatedCards, processAnimationQueue]
  );

  return { animatedCards, handleCardInView };
};

// Individual card component with its own scroll trigger
const MovieCardWithAnimation = ({
  movie,
  variants,
  isAnimated,
  onInView,
  isDesktop,
}: {
  movie: NonNullable<NonNullable<IMovieClubListBlocks['movies']>[number]>;
  variants: Variants;
  isAnimated: boolean;
  onInView: () => void;
  isDesktop: boolean;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    amount: isDesktop ? 0.3 : 0,
  });

  // Call onInView when card comes into view
  React.useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial='hidden'
      animate={isAnimated ? 'visible' : 'hidden'}
    >
      <MovieClubCard movie={movie} />
    </motion.div>
  );
};

const MovieClubList = (block: IMovieClubListBlocks) => {
  const { animatedCards, handleCardInView } = useAnimationQueue();
  const isDesktop = useIsDesktop();
  if (block._type !== 'movieClubList') return null;

  const { movies } = block;
  if (movies?.length === 0) return null;

  return (
    <section className='page-x-spacing grid gap-10 grid-cols-1 md:grid-cols-2 lg:gap-2 lg:grid-cols-3 xl:grid-cols-4'>
      {movies?.map((movieItem, index) =>
        movieItem && '_id' in movieItem && 'title' in movieItem ? (
          <MovieCardWithAnimation
            key={`${movieItem._id}-${index}`}
            movie={movieItem}
            variants={CARD_VARIANTS}
            isAnimated={animatedCards.has(index)}
            onInView={() => handleCardInView(index)}
            isDesktop={isDesktop}
          />
        ) : null
      )}
    </section>
  );
};

export default MovieClubList;
