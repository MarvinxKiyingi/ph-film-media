import ResolvedLink from '@/components/ResolvedLink';
import { BlockListItem } from '@/types/IBlockListItem';
import CardContent from './CardContent';

type ICardWrapperProps = {
  card: NonNullable<
    Extract<BlockListItem, { _type: 'heroCarousel' }>['mediaCard']
  >[number];
  index: number;
  className?: string;
};

export default function CardWrapper({
  card,
  index,
  className,
}: ICardWrapperProps) {
  const wrapperClassName = `relative flex flex-col h-full flex-shrink-0 min-w-[85%] mr-2 lg:min-w-[33.3333%] max-lg:gap-4 ${className || ''}`;

  return card.cardLink ? (
    <div data-sanity-edit-target>
      <ResolvedLink link={card.cardLink} className={wrapperClassName}>
        <CardContent card={card} index={index} />
      </ResolvedLink>
    </div>
  ) : (
    <div className={wrapperClassName} data-sanity-edit-target>
      <CardContent card={card} index={index} />
    </div>
  );
}
