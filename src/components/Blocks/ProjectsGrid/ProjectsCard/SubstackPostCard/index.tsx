import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ISubstackPost } from '@/types/IProjectsGrid';

type SubstackPostCardProps = {
  post: ISubstackPost;
  className?: string;
  isFeatured?: boolean;
};

const SubstackPostCard = ({
  post,
  className,
  isFeatured = false,
}: SubstackPostCardProps) => {
  const imageUrl = post.image;
  const shortDescription = post.contentSnippet
    ? post.contentSnippet.slice(0, 150) +
      (post.contentSnippet.length > 150 ? '...' : '')
    : '';

  if (isFeatured) {
    const featuredClassName =
      'container-fluid flex flex-col gap-6 lg:flex-row p-2.5 bg-dark-gray rounded-lg lg:gap-0';
    const featuredContent = (
      <>
        {imageUrl && (
          <div className='relative lg:w-2/3 w-full aspect-16/9'>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className='object-cover rounded-lg'
              sizes='(max-width: 1024px) 100vw, 66vw'
            />
          </div>
        )}
        <div className='flex flex-col gap-5 max-lg:pb-2.5 lg:flex-1 lg:px-10 lg:py-6'>
          <h2 className='font-oswald text-h-21 lg:text-h-28 xl:text-h-37'>
            {post.title}
          </h2>
          {shortDescription && (
            <div className='text-b-16'>
              <p>{shortDescription}</p>
            </div>
          )}
        </div>
      </>
    );

    return (
      <Link
        href={post.link}
        target='_blank'
        rel='noopener noreferrer'
        className={featuredClassName}
      >
        {featuredContent}
      </Link>
    );
  }

  const content = (
    <>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          width={1920}
          height={1080}
          className='rounded-lg aspect-16/9 object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
      )}
      <div className='grid gap-5'>
        <h3 className='text-b-21 font-bold'>{post.title}</h3>
        {shortDescription && (
          <div className='text-b-16 lg:text-b-14 xl:text-b-16'>
            <p>{shortDescription}</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <Link
      href={post.link}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
    >
      {content}
    </Link>
  );
};

export default SubstackPostCard;
