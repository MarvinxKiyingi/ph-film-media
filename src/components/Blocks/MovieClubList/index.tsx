'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import MovieClubCard from './MovieClubCard';
import { useIsDesktop } from '../../../utils/isDesktop';

export type IMovieClubListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieClubList' }
>;

// Container animation - handles stagger timing
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Faster stagger between cards
    },
  },
};

// Card animation
const cardVariants: Variants = {
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
      duration: 0.6, // Faster animation duration
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    },
  },
};

const MovieClubList = (block: IMovieClubListBlocks) => {
  const isDesktop = useIsDesktop();

  if (block._type !== 'movieClubList') return null;

  const { movies } = block;
  if (movies?.length === 0) return null;

  return (
    <section className='page-x-spacing'>
      <motion.div
        className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:gap-2 lg:grid-cols-3 xl:grid-cols-4'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: isDesktop ? 0.1 : 0 }}
      >
        {movies?.map((movieItem, index) =>
          movieItem && '_id' in movieItem && 'title' in movieItem ? (
            <motion.div
              key={`${movieItem._id}-${index}`}
              variants={cardVariants}
            >
              <MovieClubCard movie={movieItem} />
            </motion.div>
          ) : null
        )}
      </motion.div>
    </section>
  );
};

export default MovieClubList;
