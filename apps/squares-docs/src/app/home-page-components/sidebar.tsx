'use client';

import React from 'react';

import NavigationItems from './navigationItems';

const SideMenu: React.FC = () => {
  return (
    <div className="hidden h-screen w-fit border-r border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-8 md:flex">
      <NavigationItems />
    </div>
  );
};

export default SideMenu;
