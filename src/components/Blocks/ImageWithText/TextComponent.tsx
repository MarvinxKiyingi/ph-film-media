'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RichText from '@/components/RichText/RichText';
import { FetchHomeResult, FetchPageResult } from '../../../../sanity.types';

type IImageWithTextBlocks = Extract<
  NonNullable<
    NonNullable<FetchPageResult | FetchHomeResult>['blockList']
  >[number],
  { _type: 'imageWithText' }
>;

type TextComponentProps = {
  textSection?: IImageWithTextBlocks['textSection'];
};

const TextComponent = ({ textSection }: TextComponentProps) => {
  return (
    <motion.div
      className="flex flex-col gap-8 md:col-start-13 md:col-span-10 md:h-fit"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      {Array.isArray(textSection) &&
        textSection.map((section, idx) => (
          <div key={section.id ?? idx} className="flex flex-col gap-2">
            <h3 className="text-b-12 font-bold !font-lato text-gray h-fit">
              <span>{section.title}</span>
            </h3>

            <RichText
              key={section.id ?? idx}
              content={section.richText ?? []}
            />
          </div>
        ))}
    </motion.div>
  );
};

export default TextComponent;
