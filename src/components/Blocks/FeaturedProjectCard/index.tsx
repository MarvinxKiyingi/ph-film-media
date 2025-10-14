import React from 'react';
import { client } from '@/sanity/lib/client';
import { fetchLatestProject } from '@/sanity/lib/queries';
import RichText from '@/components/RichText/RichText';
import SanityImage from '@/components/Media/SanityImage';

const index = async () => {
  const projectToDisplay = await client.fetch(fetchLatestProject);

  return (
    <section className='page-x-spacing '>
      <div className='container-fluid flex flex-col gap-6 lg:flex-row p-2.5 bg-dark-gray rounded-lg lg:gap-0'>
        {projectToDisplay?.projectImage && (
          <div className='w-full h-full rounded-xl overflow-hidden aspect-16/9 lg:w-[60%]'>
            <SanityImage
              {...projectToDisplay.projectImage}
              className='object-cover w-full h-full'
            />
          </div>
        )}
        <div className='flex flex-col gap-5 max-lg:pb-2.5 lg:flex-1 lg:px-10 lg:py-6'>
          <h2 className='font-oswald text-h-21 lg:text-h-28 xl:text-h-37'>
            {projectToDisplay?.title}
          </h2>
          {projectToDisplay?.description && (
            <div className='text-b-16'>
              <RichText
                content={projectToDisplay?.description}
                className='!line-clamp-[5] lg:!line-clamp-[8] 2xl:!line-clamp-[12]'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default index;
