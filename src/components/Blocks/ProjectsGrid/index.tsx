import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import ProjectsGridClient from './ProjectsGridClient';
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
    <ProjectsGridClient
      featuredProject={featuredProject}
      regularProjects={regularProjects}
    />
  );
};

export default ProjectsGrid;
