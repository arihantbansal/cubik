'use client';

import React, { Dispatch, SetStateAction } from 'react';

import NavigationItems from './navigationItems';

const SideMenu: React.FC = () => {
  return (
    <div className="mt-12 hidden min-h-screen w-fit border-r border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-8 md:mt-0 md:flex">
      <NavigationItems />
    </div>
  );
};
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const SideMenuMobile = (props: Props) => {
  if (!props.isOpen) {
    return <></>;
  }
  return (
    <div className="fixed left-0 mt-12 min-h-screen w-fit border-r border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] p-8 md:mt-0">
      <NavigationItems />
    </div>
  );
};

export default SideMenu;
