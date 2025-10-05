import React from 'react';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import ResolvedLink from '@/components/ResolvedLink';
import type {
  Projects,
  LinkType,
  RichText as SanityRichText,
} from '../../../../../sanity.types';
import { SanityImageObject } from '@/components/Media/SanityImage/SanityImageObject';

type FeaturedProjectCardProps = {
  project: Projects;
};

const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  const className =
    'container-fluid flex flex-col gap-6 lg:flex-row p-2.5 bg-dark-gray rounded-lg lg:gap-0';
  const content = (
    <>
      {project?.projectImage && (
        <SanityImage
          {...(project.projectImage as unknown as SanityImageObject)}
          className='rounded-lg lg:w-2/3'
          aspectRatio='16/9'
        />
      )}
      <div className='flex flex-col gap-5 max-lg:pb-2.5 lg:flex-1 lg:px-10 lg:py-6'>
        <h2 className='font-oswald text-h-21 lg:text-h-28 xl:text-h-37'>
          {project?.title}
        </h2>
        {project?.description && (
          <div className='text-b-16'>
            <RichText content={project?.description as SanityRichText} />
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

export default FeaturedProjectCard;
