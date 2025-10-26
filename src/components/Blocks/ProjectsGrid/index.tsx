import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import SanityProjectCard from './ProjectsCard';
import type { FetchHomeResult } from '../../../../sanity.types';

type ProjectsGridBlock = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number] & { _type: 'projectsGrid' };

type IProjectsGrid = {
  showFeaturedProjectCard?: boolean;
  featuredProjectCardOverride?: ProjectsGridBlock['featuredProjectCardOverride'];
};

const ProjectsGrid = async ({
  showFeaturedProjectCard,
  featuredProjectCardOverride,
}: IProjectsGrid) => {
  const projects = await client.fetch(fetchAllProjects);

  // Sort projects by creation date
  const sortedProjects = projects.sort((a, b) => {
    const dateA = new Date(a._createdAt || '').getTime();
    const dateB = new Date(b._createdAt || '').getTime();
    return dateB - dateA;
  });

  // Use override if provided, otherwise use the first project
  const featuredProject = showFeaturedProjectCard
    ? featuredProjectCardOverride || sortedProjects[0] || null
    : null;

  // Filter out featured project from regular items
  const regularProjects = featuredProject
    ? sortedProjects.filter((project) => project._id !== featuredProject._id)
    : sortedProjects;

  return (
    <section className='page-x-spacing grid gap-2'>
      {featuredProject && (
        <SanityProjectCard
          key={featuredProject._id}
          project={featuredProject}
          isFeatured={true}
        />
      )}
      <div className='grid gap-x-2 gap-y-5 grid-cols-1 md:grid-cols-2 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-fr'>
        {regularProjects.map((project, index) => {
          const isFirstHighlighted = !featuredProject && index === 0;
          const className = `flex flex-col gap-6 hover:opacity-80 transition-opacity h-full ${isFirstHighlighted ? 'p-2.5 bg-dark-gray rounded-lg' : ''}`;

          return (
            <SanityProjectCard
              key={project._id}
              project={project}
              className={className}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsGrid;
