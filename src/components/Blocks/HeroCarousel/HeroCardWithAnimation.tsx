'use client';

import { motion, Variants } from 'framer-motion';
import { BlockListItem } from '@/types/IBlockListItem';
import CardWrapper from './CardWrapper';

interface HeroCardWithAnimationProps {
  card: NonNullable<
    Extract<BlockListItem, { _type: 'heroCarousel' }>['mediaCard']
  >[number];
  index: number;
  variants: Variants;
  isAnimated: boolean;
  isDesktop: boolean;
}

export default function HeroCardWithAnimation({
  card,
  index,
  variants,
  isAnimated,
  isDesktop,
}: HeroCardWithAnimationProps) {
  return isDesktop ? (
    <motion.div
      key={`motion-card-${card.id ?? index}`}
      variants={variants}
      initial='hidden'
      animate={isAnimated ? 'visible' : 'hidden'}
      className='aspect-4/5 h-full'
    >
      <CardWrapper card={card} index={index} />
    </motion.div>
  ) : (
    <div key={`static-card-${card.id ?? index}`}>
      <CardWrapper card={card} index={index} />
    </div>
  );
}
