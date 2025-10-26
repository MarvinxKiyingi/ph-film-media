import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import { fetchSubstackPosts } from '@/utils/fetchSubstackPosts';
import ProjectCard from './ProjectsCard';
import type { IUnifiedProjectItem } from '@/types/IProjectsGrid';
import type { FetchHomeResult } from '../../../../sanity.types';

type ProjectsGridBlock = NonNullable<
  NonNullable<FetchHomeResult>['blockList']
>[number] & { _type: 'projectsGrid' };

type IProjectsGrid = {
  showFeaturedProjectCard?: boolean;
  showSubstackPostsCard?: boolean;
  featuredProjectCardOverride?: ProjectsGridBlock['featuredProjectCardOverride'];
};

const ProjectsGrid = async ({
  showFeaturedProjectCard,
  showSubstackPostsCard,
  featuredProjectCardOverride,
}: IProjectsGrid) => {
  const projects = await client.fetch(fetchAllProjects);
  const substackPosts = showSubstackPostsCard ? await fetchSubstackPosts() : [];

  const unifiedItems: IUnifiedProjectItem[] = [
    ...projects.map((project) => ({
      type: 'sanity' as const,
      date: project._createdAt || '',
      data: project,
    })),
    ...substackPosts.map((post) => ({
      type: 'substack' as const,
      date: post.pubDate || '',
      data: post,
    })),
  ];

  const sortedItems = unifiedItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const featuredItem = showFeaturedProjectCard
    ? featuredProjectCardOverride
      ? {
          type: 'sanity' as const,
          date: featuredProjectCardOverride._createdAt || '',
          data: featuredProjectCardOverride,
        }
      : sortedItems[0] || null
    : null;

  // Filter out featured item from regular items
  const regularItems = sortedItems.filter((item, index) => {
    if (!featuredItem) return true;
    if (featuredItem.type === 'sanity' && item.type === 'sanity') {
      return item.data._id !== featuredItem.data._id;
    }
    return index !== 0;
  });

  return (
    <section className='page-x-spacing grid gap-2'>
      {featuredItem && (
        <ProjectCard
          key={
            featuredItem.type === 'sanity'
              ? featuredItem.data._id
              : featuredItem.data.link
          }
          item={featuredItem}
          isFeatured={true}
        />
      )}
      <div className='grid gap-x-2 gap-y-5 grid-cols-1 md:grid-cols-2 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-fr'>
        {regularItems.map((item, index) => {
          const isFirstHighlighted = !featuredItem && index === 0;
          const className = `flex flex-col gap-6 hover:opacity-80 transition-opacity h-full ${isFirstHighlighted ? 'p-2.5 bg-dark-gray rounded-lg' : ''}`;

          return (
            <ProjectCard
              key={item.type === 'sanity' ? item.data._id : item.data.link}
              item={item}
              className={className}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsGrid;
