import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import ProjectCard from './ProjectsCard';
import FeaturedProjectCard from './FeaturedProjectCard';
import type { Projects } from '../../../../sanity.types';

type IProjectsGrid = {
  showFeaturedProjectCard?: boolean;
};

const ProjectsGrid = async ({ showFeaturedProjectCard }: IProjectsGrid) => {
  const projects: Projects[] = await client.fetch(fetchAllProjects);
  const projectToDisplay = projects[0];
  const projectsForGrid = showFeaturedProjectCard
    ? projects.slice(1)
    : projects;

  return (
    <section className='page-x-spacing grid gap-2'>
      {showFeaturedProjectCard && projectToDisplay && (
        <FeaturedProjectCard project={projectToDisplay} />
      )}
      <div className='grid gap-x-2 gap-y-5 grid-cols-1 md:grid-cols-2 lg:gap-y-10 lg:grid-cols-3'>
        {projectsForGrid.map((project, index) => {
          const isFirstHighlighted = !showFeaturedProjectCard && index === 0;
          const className = `grid gap-6 ${isFirstHighlighted && 'p-2.5 bg-dark-gray rounded-lg'}`;

          return (
            <ProjectCard
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
