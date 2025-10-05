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
      {/* Full-screen image container - fills entire dvh on mobile */}
      <div className='absolute inset-0 w-full h-full select-none lg:relative lg:flex lg:flex-col lg:gap-4'>
        {card.cardImage && (
          <div
            className='w-full h-full overflow-hidden lg:aspect-4/5 lg:rounded-lg'
            data-sanity-edit-target
          >
            <SanityImage
              {...card.cardImage}
              className='w-full h-full object-cover lg:rounded-lg absolute inset-0'
              aspectRatio='4/5'
            />
          </div>
        )}
      </div>

      {/* Text overlay - positioned at bottom on mobile, desktop styling preserved */}
      <div className='absolute bottom-0 left-0 right-0 flex flex-col gap-2 z-10 px-5 pb-11 lg:justify-end lg:px-10 lg:pb-4 lg:h-full lg:w-full lg:top-0'>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between z-10 relative'>
          <div className='flex flex-col gap-2 flex-1'>
            <h3
              className='text-h-28 uppercase lg:text-h-28'
              data-sanity-edit-target
            >
              {card.title}
            </h3>
            {card.infoItems && card.infoItems.length > 0 && (
              <div
                className='flex flex-wrap gap-3 lg:gap-6'
                data-sanity-edit-target
              >
                {card.infoItems?.map((item, itemIdx: number) => (
                  <p
                    key={`info-item-${card.id ?? index}-${item.id ?? itemIdx}`}
                    className='text-b-16 lg:text-b-16 font-oswald'
                  >
                    {item.infoItemTitle}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className='block absolute left-0 right-0 bottom-0 w-full h-2/4 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-0' />
    </>
  );
}
