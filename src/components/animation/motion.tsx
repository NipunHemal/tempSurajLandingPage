
'use client';

import {
  motion,
  useInView,
  type AnimationProps,
  type HTMLMotionProps,
  type ForwardRefComponent,
} from 'framer-motion';
import { ElementType, useRef } from 'react';

type MotionComponent<T extends ElementType> = ForwardRefComponent<
  HTMLElement,
  HTMLMotionProps<any>
>;

type MotionProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

const defaultAnimation: AnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const Motion = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: MotionProps<T> & HTMLMotionProps<any>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Component = motion(as || 'div') as MotionComponent<T>;

  return (
    <Component
      ref={ref}
      className={className}
      animate={isInView ? 'animate' : 'initial'}
      {...defaultAnimation}
      {...rest}
    >
      {children}
    </Component>
  );
};
