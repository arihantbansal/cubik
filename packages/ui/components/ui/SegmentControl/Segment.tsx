'use client';

import * as React from 'react';
import * as SegmentPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../../lib/utils';

const Segment = SegmentPrimitive.Root;

const SegmentSizing = {
  sm: {
    trigger: 'px-[12px] py-[8px]',
    content: '',
    list: 'p-[4px] gap-[2px] w-[491px]',
  },
  md: {
    trigger: 'px-[12px] py-[4px] h-[36px]',
    content: '',
    list: 'p-[6px] gap-[4px] w-[555px]',
  },
  lg: {
    trigger: 'px-[16px] py-[4px] h-[36px] ',
    content: '',
    list: 'p-[8px] gap-[8px] w-[652px]',
  },
  xl: {
    trigger: 'px-[16px] py-[8px] h-[36px]',
    content: '',
    list: 'p-[8px] gap-[8px] w-[710px]',
  },
  '2xl': {
    trigger: 'px-[16px] py-[8px] h-[36px]',
    content: '',
    list: 'p-[8px] gap-[8px] w-[775px]',
  },
};

interface SegmentContextType {
  size: keyof typeof SegmentSizing;
}
const SegmentContext = React.createContext<SegmentContextType>({
  size: 'lg',
});

interface Props {
  size: SegmentContextType['size'];
  children: React.ReactNode | React.JSX.Element;
}
const SegmentContainer = ({ children, size }: Props) => {
  return (
    <SegmentContext.Provider value={{ size }}>
      {children}
    </SegmentContext.Provider>
  );
};

const SegmentPosition = {
  end: 'justify-end',
  start: 'justify-start',
};
type SegmentListProps = React.ComponentPropsWithoutRef<
  typeof SegmentPrimitive.List
> & {
  position?: keyof typeof SegmentPosition;
};
const SegmentList = React.forwardRef<
  React.ElementRef<typeof SegmentPrimitive.List>,
  SegmentListProps
>(({ className, position = 'start', ...props }, ref) => {
  const context = React.useContext(SegmentContext);
  return (
    <div className={cn('flex', SegmentPosition[position])}>
      <SegmentPrimitive.List
        ref={ref}
        className={cn(
          'inline-flex h-12  items-center justify-evenly bg-[var(--tab-surface-inactive)] rounded-full',
          className,
          SegmentSizing[context.size].list,
        )}
        {...props}
      />
    </div>
  );
});
SegmentList.displayName = SegmentPrimitive.List.displayName;

const SegmentTrigger = React.forwardRef<
  React.ElementRef<typeof SegmentPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SegmentPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SegmentContext);
  return (
    <SegmentPrimitive.Trigger
      ref={ref}
      className={cn(
        SegmentSizing[context.size].trigger,
        'inline-flex items-center w-full justify-center whitespace-nowrap text-sm font-medium transition-all  data-[state=active]:bg-[var(--tab-surface-active)] text-[var(--tab-fg-inactive)] data-[state=active]:text-[var(--tab-fg-active)] rounded-full ',
        className,
      )}
      {...props}
    />
  );
});
SegmentTrigger.displayName = SegmentPrimitive.Trigger.displayName;

const SegmentContent = React.forwardRef<
  React.ElementRef<typeof SegmentPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SegmentPrimitive.Content>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SegmentContext);
  return (
    <SegmentPrimitive.Content
      ref={ref}
      className={cn('mt-2', className, SegmentSizing[context.size].content)}
      {...props}
    />
  );
});
SegmentContent.displayName = SegmentPrimitive.Content.displayName;

export {
  Segment,
  SegmentList,
  SegmentTrigger,
  SegmentContent,
  SegmentContainer,
};
