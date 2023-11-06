'use client';

import React, { createContext, ReactNode, useContext } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

type TabContextType = {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

const TabContext = createContext<TabContextType>({
  size: 'lg',
  className: '',
});

const tabVariants = cva(
  ' leading-loose text-lg text-[var(--tab-fg-inactive)] data-[state=active]:text-[var(--tab-fg-active)] data-[state=active]:font-semibold font-medium data-[state=active]:border-b-[2px] data-[state=active]:border-[var(--tab-border-active)] font-normal',
  {
    variants: {
      size: {
        xxs: 'text-xs leading-3 pb-[0.375rem]',
        xs: 'text-sm leading-4 pb-[0.375rem]',
        sm: 'text-base leading-5 pb-2',
        md: 'text-lg leading-6 pb-4',
        lg: 'text-xl leading-7 pb-4',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

type TabListProps = {
  children: ReactNode;
  className?: string;
};

type TabProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

type TabPanelsProps = {
  children: ReactNode;
  className?: string;
};

type TabPanelProps = {
  children: ReactNode;
  value: string;
};

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  size,
  className,
}) => (
  <TabContext.Provider value={{ size, className }}>
    <RadixTabs.Root
      defaultValue={defaultValue}
      className={cn(tabVariants({ size }), className)}
    >
      {children}
    </RadixTabs.Root>
  </TabContext.Provider>
);

const TabList: React.FC<TabListProps> = ({ children, className }) => (
  <RadixTabs.List className={className}>{children}</RadixTabs.List>
);

const Tab: React.FC<TabProps> = ({ children, value, className }) => {
  const { size } = useContext(TabContext);

  const tabStyles = cn(tabVariants({ size }));

  return (
    <RadixTabs.Trigger value={value} className={`${tabStyles} ${className}`}>
      {children}
    </RadixTabs.Trigger>
  );
};

const TabPanels: React.FC<TabPanelsProps> = ({ children, className }) => (
  <div className={cn('p-4', className)}>{children}</div>
);

const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => (
  <RadixTabs.Content value={value} className="w-full">
    {children}
  </RadixTabs.Content>
);

Tab.displayName = 'Tab';

export { Tabs, Tab, TabList, TabPanels, TabPanel };
