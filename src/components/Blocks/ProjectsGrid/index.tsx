import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import ProjectCard from './ProjectsCard';
import type { Projects } from '../../../../sanity.types';
import { SanityImageObject } from '@/components/Media/SanityImage/SanityImageObject';

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
        <div className='container-fluid flex flex-col gap-6 lg:flex-row p-2.5 bg-dark-gray rounded-lg lg:gap-0'>
          {projectToDisplay?.projectImage && (
            <SanityImage
              {...(projectToDisplay.projectImage as unknown as SanityImageObject)}
              className='rounded-lg lg:w-2/3'
              aspectRatio='16/9'
            />
          )}
          <div className='flex flex-col gap-5 max-lg:pb-2.5 lg:flex-1 lg:px-10 lg:py-6'>
            <h2 className='font-oswald text-h-21 lg:text-h-28 xl:text-h-37'>
              {projectToDisplay?.title}
            </h2>
            {projectToDisplay?.description && (
              <div className='text-b-16'>
                <RichText content={projectToDisplay?.description} />
              </div>
            )}
          </div>
        </div>
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
