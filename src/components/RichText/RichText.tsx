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
      h3: (props: React.PropsWithChildren<object>) => {
        const fullText = React.Children.toArray(props.children).join('');
        const parts = fullText.split(',').map((part) => part.trim());

        return (
          <span className='flex flex-wrap gap-x-2 text-b-21 font-bold'>
            {parts.map((part, idx) => (
              <span key={idx}>
                {part}
                {idx < parts.length - 1 && ','}
              </span>
            ))}
          </span>
        );
      },
    },
  };

  return (
    <div className={`flex flex-col gap-3.5 ${className || ''}`}>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichTextComponent;
