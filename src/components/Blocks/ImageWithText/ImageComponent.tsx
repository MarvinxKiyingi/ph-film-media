'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SanityImage from '@/components/Media/SanityImage';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IImageWithTextBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'imageWithText' }
>;

type ImageProps = {
  mediaItem?: IImageWithTextBlocks['mediaItem'];
  mediaTitle?: string | null;
};

const ImageComponent = ({ mediaItem, mediaTitle }: ImageProps) => {
  if (!mediaItem?.media) return null;

  return (
    <motion.div
      className="grid gap-5 h-fit md:row-start-1 md:col-start-1 md:col-span-10"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      <SanityImage
        {...mediaItem}
        className="aspect-4/5 rounded-lg"
        aspectRatio="4/5"
      />

      <h2 className="text-b-12 font-bold !font-lato text-gray">
        <span>{mediaTitle}</span>
      </h2>
    </motion.div>
  );
};

export default ImageComponent;
