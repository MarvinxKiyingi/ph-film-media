'use client';
import RichText from '@/components/RichText/RichText';
import React, { useState, useRef } from 'react';
import { RichText as RichTextType } from '../../../../sanity.types';

const ExpandableRichText = ({ content }: { content: RichTextType }) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState('10rem');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    if (contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }
    setExpanded(true);
  };

  const handleCollapse = () => {
    setMaxHeight('10rem');
    setExpanded(false);
  };

  return (
    <div className='relative'>
      <div
        ref={contentRef}
        className={`
          transition-all duration-200 ease-in-out
          overflow-hidden
          text-ellipsis
          ${!expanded ? 'line-clamp-[6] lg:line-clamp-none' : ''}
        `}
        style={{
          position: 'relative',
          maxHeight: expanded ? maxHeight : '10rem',
          ...(expanded
            ? {}
            : {
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }),
        }}
      >
        <RichText content={content} />
      </div>
      <button
        className='hidden lg:block mt-2 text-blue-500 underline'
        onClick={expanded ? handleCollapse : handleExpand}
      >
        {expanded ? 'Vis mindre' : 'Vis mer'}
      </button>
    </div>
  );
};

export default ExpandableRichText;
