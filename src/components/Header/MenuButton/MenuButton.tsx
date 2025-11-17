'use client';

import { motion, Transition, SVGMotionProps } from 'framer-motion';

interface Props extends SVGMotionProps<SVGSVGElement> {
  color?: string;
  strokeWidth?: string | number;
  transition?: Transition;
  lineProps?: SVGMotionProps<SVGLineElement>;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const MenuButton = ({
  width = 20,
  height = 20,
  strokeWidth = 1,
  color = 'var(--color-white)',
  transition,
  lineProps,
  isOpen,
  ...props
}: Props) => {
  const variant = isOpen ? 'opened' : 'closed';
  const gap = 6;
  const unitHeight = 4;
  const unitWidth = (unitHeight * (width as number)) / (height as number);
  const centerY = unitHeight / 2;
  const gapY = (gap * (unitHeight / (height as number))) / 2;
  const top = {
    closed: {
      rotate: 0,
      translateY: -gapY,
    },
    opened: {
      rotate: 45,
      translateY: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: gapY,
    },
    opened: {
      rotate: -45,
      translateY: 0,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant,
    transition,
    ...lineProps,
  };

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow='visible'
      preserveAspectRatio='none'
      width={width}
      height={height}
      className='cursor-pointer'
      {...props}
    >
      <motion.line
        x1='0'
        x2={unitWidth}
        y1={centerY}
        y2={centerY}
        variants={top}
        {...lineProps}
      />
      <motion.line
        x1='0'
        x2={unitWidth}
        y1={centerY}
        y2={centerY}
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  );
};
