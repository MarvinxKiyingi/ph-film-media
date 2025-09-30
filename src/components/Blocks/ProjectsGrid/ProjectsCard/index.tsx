import React from 'react';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import ResolvedLink from '@/components/ResolvedLink';
import type {
  Projects,
  LinkType,
  RichText as SanityRichText,
} from '../../../../../sanity.types';
import type { SanityImageObject } from '@/components/Media/SanityImage/SanityImageObject';

type ProjectCardProps = {
  project: Projects;
  className?: string;
};

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const content = (
    <>
      {project.projectImage && (
        <SanityImage
          {...(project.projectImage as unknown as SanityImageObject)}
          aspectRatio='16/9'
          className='rounded-lg'
        />
      )}
      <div className='grid gap-5'>
        <h3 className='text-b-21 font-bold'>{project.title}</h3>
        {project.description && (
          <div className='text-b-16'>
            <RichText content={project.description as SanityRichText} />
          </div>
        )}
      </div>
    </>
  );

  return project.link ? (
    <ResolvedLink link={project.link as LinkType} className={className}>
      {content}
    </ResolvedLink>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default ProjectCard;
