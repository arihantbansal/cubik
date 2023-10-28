import React from 'react';

import NavigationItems from './navigationItems';

const SideMenu: React.FC = () => {
  return (
    <div className="bg-[var(--color-surface-secondary)] flex w-fit h-screen border-r border-[var(--color-border-primary)] p-8">
      <NavigationItems />
    </div>
  );
};

export default SideMenu;
