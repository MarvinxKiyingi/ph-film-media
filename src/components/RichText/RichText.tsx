import React from 'react';
import { PortableText } from '@portabletext/react';
import type { RichText } from '../../../sanity.types';

const RichTextComponent = ({
  content,
  className,
}: {
  content: RichText;
  className?: string;
}) => {
  if (!content) return null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <PortableText value={content} />
    </div>
  );
};

export default RichTextComponent;
