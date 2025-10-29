'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import MovieClubCard from '../MovieClubCard';
import { IMovieClubListBlocks } from '..';
import { useIsDesktop } from '../../../../utils/isDesktop';

type IMovieClubGrid = {
  movies: IMovieClubListBlocks['movies'];
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

const MovieClubGrid = ({ movies }: IMovieClubGrid) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      {movies?.map((movieItem, index) =>
        movieItem && '_id' in movieItem && 'title' in movieItem ? (
          <motion.div
            key={`${movieItem._id}-${index}`}
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: isDesktop ? 0.1 : 0 }}
          >
            <MovieClubCard movie={movieItem} />
          </motion.div>
        ) : null
      )}
    </>
  );
};

export default MovieClubGrid;
