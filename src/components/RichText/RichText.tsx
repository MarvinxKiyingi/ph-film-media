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

  const components = {
    block: {
      h3: (props: React.PropsWithChildren<object>) => (
        <span className='text-b-21 font-bold '>{props.children}</span>
      ),
    },
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichTextComponent;
