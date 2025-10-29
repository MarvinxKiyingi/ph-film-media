import React from 'react';
import SanityImage from '@/components/Media/SanityImage';
import RichText from '@/components/RichText/RichText';
import ResolvedLink from '@/components/ResolvedLink';
import type {
  FetchAllProjectsResult,
  LinkType,
  RichText as SanityRichText,
} from '../../../../../sanity.types';
import type { SanityImageObject } from '@/components/Media/SanityImage/SanityImageObject';

type SanityProjectCardProps = {
  project: FetchAllProjectsResult[number];
  className?: string;
  isFeatured?: boolean;
};

const SanityProjectCard = ({
  project,
  className,
  isFeatured = false,
}: SanityProjectCardProps) => {
  if (isFeatured) {
    const featuredClassName =
      'container-fluid flex flex-col gap-6 lg:flex-row p-2.5 bg-dark-gray rounded-lg lg:gap-0';
    const featuredContent = (
      <>
        {project.projectImage && (
          <SanityImage
            {...(project.projectImage as unknown as SanityImageObject)}
            className='object-cover rounded-sm lg:w-2/3'
            aspectRatio='16/9'
          />
        )}
        <div className='flex flex-col gap-5 lg:flex-1 lg:px-10 lg:py-6'>
          <h2 className='font-oswald text-h-21 lg:text-h-28 xl:text-h-37'>
            {project.title}
          </h2>
          {project.description && (
            <div className='text-b-16'>
              <RichText content={project.description as SanityRichText} />
            </div>
          )}
        </div>
      </>
    );

    return project.link ? (
      <ResolvedLink
        link={project.link as unknown as LinkType}
        className={featuredClassName}
      >
        {featuredContent}
      </ResolvedLink>
    ) : (
      <div className={featuredClassName}>{featuredContent}</div>
    );
  }

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
          <div className='text-b-16 lg:text-b-14 xl:text-b-16'>
            <RichText
              content={project.description as SanityRichText}
              className='!line-clamp-[4] lg:!line-clamp-[5] 2xl:!line-clamp-[8]'
            />
          </div>
        )}
      </div>
    </>
  );

  return project.link ? (
    <ResolvedLink
      link={project.link as unknown as LinkType}
      className={className}
    >
      {content}
    </ResolvedLink>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default SanityProjectCard;
