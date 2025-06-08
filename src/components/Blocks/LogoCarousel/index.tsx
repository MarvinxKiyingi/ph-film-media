import React from 'react';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';
import SanityImage from '@/components/Media/SanityImage';
import Marquee from 'react-fast-marquee';

type ILogoCarouselBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'logoCarousel' }
>;

const LogoCarousel = ({ logoItems }: ILogoCarouselBlocks) => {
  return (
    <section className='py-10'>
      <Marquee
        autoFill
        className='w-full'
        speed={20}
        gradient={true}
        gradientColor={'var(--color-background)'}
        gradientWidth={100}
      >
        <ul className='flex w-full overflow-x-auto items-center justify-center gap-32 pr-32'>
          {logoItems?.map((logo, idx) =>
            logo.mediaItem?.media ? (
              <li key={idx} className='w-full h-full'>
                <SanityImage
                  useImageAspect
                  className='w-full h-auto max-h-[10vh] lg:max-h-[115px] !object-contain'
                  {...logo.mediaItem}
                />
              </li>
            ) : null
          )}
        </ul>
      </Marquee>
    </section>
  );
};

export default LogoCarousel;
