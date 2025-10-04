import React from 'react';
import SanityProjectCard from './SanityProjectCard/index';
import SubstackPostCard from './SubstackPostCard/index';
import { IUnifiedProjectItem } from '@/types/IProjectsGrid';

type ProjectCardProps = {
  item: IUnifiedProjectItem;
  className?: string;
  isFeatured?: boolean;
};

const ProjectCard = ({
  item,
  className,
  isFeatured = false,
}: ProjectCardProps) => {
  if (item.type === 'sanity') {
    return (
      <SanityProjectCard
        project={item.data}
        className={className}
        isFeatured={isFeatured}
      />
    );
  }

  return (
    <SubstackPostCard
      post={item.data}
      className={className}
      isFeatured={isFeatured}
    />
  );
};

export default ProjectCard;
