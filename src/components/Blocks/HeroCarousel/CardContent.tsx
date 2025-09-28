import SanityImage from '@/components/Media/SanityImage';
import { BlockListItem } from '@/types/IBlockListItem';

type ICardContentProps = {
  card: NonNullable<
    Extract<BlockListItem, { _type: 'heroCarousel' }>['mediaCard']
  >[number];
  index: number;
};

export default function CardContent({ card, index }: ICardContentProps) {
  return (
    <>
      <div className='relative flex flex-col gap-2 select-none lg:w-full lg:h-full lg:gap-4'>
        {card.cardImage && (
          <div
            className='aspect-4/5 w-full h-full rounded-lg overflow-hidden'
            data-sanity-edit-target
          >
            <SanityImage
              {...card.cardImage}
              className='w-full h-full object-cover rounded-lg absolute inset-0'
              aspectRatio='4/5'
            />
          </div>
        )}
      </div>

      <div className='relative flex flex-col gap-2 z-10 lg:justify-end lg:px-10 lg:pb-4 lg:h-full lg:w-full lg:!absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0'>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <div className='flex flex-col gap-2 flex-1'>
            <h3
              className='text-h-21 uppercase lg:text-h-28'
              data-sanity-edit-target
            >
              {card.title}
            </h3>
            <div
              className='flex flex-wrap gap-3 lg:gap-6'
              data-sanity-edit-target
            >
              {card.infoItems?.map((item, itemIdx: number) => (
                <p
                  key={`info-item-${card.id ?? index}-${item.id ?? itemIdx}`}
                  className='text-b-12 lg:text-b-16'
                >
                  {item.infoItemTitle}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
