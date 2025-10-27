'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import MovieClubCard from './MovieClubCard';
import { useIsDesktop } from '@/utils/isDesktop';

export type IMovieClubListBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'movieClubList' }
>;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    },
  },
};

const MovieClubList = (block: IMovieClubListBlocks) => {
  const isDesktop = useIsDesktop();

  if (block._type !== 'movieClubList') return null;

  const { movies } = block;
  if (movies?.length === 0) return null;

  const columnsPerRow = isDesktop ? 3 : 1;

  return (
    <motion.section
      className='page-x-spacing grid gap-10 grid-cols-1 md:grid-cols-2 lg:gap-2 lg:grid-cols-3 xl:grid-cols-4'
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{
        once: true,
        amount: 0.1,
      }}
    >
      {movies?.map((movieItem, index) =>
        movieItem && '_id' in movieItem && 'title' in movieItem ? (
          <motion.div
            key={`${movieItem._id}-${index}`}
            variants={cardVariants}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: (index % columnsPerRow) * 0.2,
            }}
          >
            <MovieClubCard movie={movieItem} />
          </motion.div>
        ) : null
      )}
    </motion.section>
  );
};

export default MovieClubList;
