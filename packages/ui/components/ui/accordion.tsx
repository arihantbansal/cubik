'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { Icon } from '../../icons/icon';
import { cn } from '../../lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'items-center justify-center text-base font-semibold',
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex w-full justify-between data-[state=closed]:border-b border-gray-700">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'inline-flex w-full items-center justify-between whitespace-nowrap px-3 py-3 text-base font-medium transition-all focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          name="chevronDown"
          stroke="#fff"
          fill="none"
          height={16}
          width={16}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=open]:animate-slideDown data-[state=open]:border-b border-gray-700 data-[state=closed]:animate-slideUp overflow-hidden ',
      className,
    )}
    {...props}
  >
    <div className="py-6 px-5">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionItem, AccordionTrigger, AccordionContent, Accordion };
