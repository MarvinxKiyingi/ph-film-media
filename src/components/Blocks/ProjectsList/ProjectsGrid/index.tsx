'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import SanityProjectCard from '../ProjectsCard';
import type { FetchAllProjectsResult } from '../../../../../sanity.types';
import { useIsDesktop } from '../../../../utils/isDesktop';
import { useViewTransitionAnimation } from '@/hooks/useViewTransitionReady';

type IProjectsGrid = {
  featuredProject: FetchAllProjectsResult[number] | null;
  regularProjects: FetchAllProjectsResult;
};

const featuredVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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

const ProjectsGrid = ({ featuredProject, regularProjects }: IProjectsGrid) => {
  const isDesktop = useIsDesktop();
  const pathname = usePathname();
  const { isReady, animationKey } = useViewTransitionAnimation(pathname);

  if (!regularProjects || (regularProjects.length === 0 && !featuredProject)) {
    return null;
  }

  return (
    <section key={animationKey} className='page-x-spacing grid gap-2'>
      {featuredProject && (
        <motion.div
          variants={featuredVariants}
          initial='hidden'
          animate={isReady ? 'visible' : 'hidden'}
          whileInView={!isReady ? undefined : 'visible'}
          viewport={{ once: true, amount: isDesktop ? 0.1 : 0 }}
        >
          <SanityProjectCard
            key={featuredProject._id}
            project={featuredProject}
            isFeatured={true}
          />
        </motion.div>
      )}
      <motion.div
        className='grid gap-x-2 gap-y-5 grid-cols-1 md:grid-cols-2 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-fr'
        variants={containerVariants}
        initial='hidden'
        animate={isReady ? 'visible' : 'hidden'}
        whileInView={!isReady ? undefined : 'visible'}
        viewport={{ once: true, amount: isDesktop ? 0.1 : 0 }}
      >
        {regularProjects.map((project, index) => {
          const isFirstHighlighted = !featuredProject && index === 0;
          const className = `flex flex-col gap-6 hover:opacity-80 transition-opacity h-full ${isFirstHighlighted ? 'p-2.5 bg-dark-gray rounded-lg' : ''}`;

          return (
            <motion.div key={project._id} variants={cardVariants}>
              <SanityProjectCard project={project} className={className} />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ProjectsGrid;
