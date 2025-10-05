import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchAllProjects } from '@/sanity/lib/queries';
import { fetchSubstackPosts } from '@/utils/fetchSubstackPosts';
import ProjectCard from './ProjectsCard';
import type { IUnifiedProjectItem } from '@/types/IProjectsGrid';

type IProjectsGrid = {
  showFeaturedProjectCard?: boolean;
  showSubstackPostsCard?: boolean;
};

const ProjectsGrid = async ({
  showFeaturedProjectCard,
  showSubstackPostsCard,
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

  const featuredItem = showFeaturedProjectCard ? sortedItems[0] : null;
  const regularItems = showFeaturedProjectCard
    ? sortedItems.slice(1)
    : sortedItems;

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
          const isFirstHighlighted = !showFeaturedProjectCard && index === 0;
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
