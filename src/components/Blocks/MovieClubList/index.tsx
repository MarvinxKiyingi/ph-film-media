'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import MovieClubGrid from './MovieClubGrid';
import { useIsDesktop } from '../../../utils/isDesktop';

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
      staggerChildren: 0.15,
    },
  },
};

const MovieClubList = (block: IMovieClubListBlocks) => {
  const isDesktop = useIsDesktop();

  if (block._type !== 'movieClubList') return null;

  const { movies } = block;
  if (movies?.length === 0) return null;

  return (
    <motion.section
      className='page-x-spacing grid gap-10 grid-cols-1 md:grid-cols-2 lg:gap-2 lg:grid-cols-3 xl:grid-cols-4'
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: isDesktop ? 0.1 : 0 }}
    >
      <MovieClubGrid movies={movies} />
    </motion.section>
  );
};

export default MovieClubList;
