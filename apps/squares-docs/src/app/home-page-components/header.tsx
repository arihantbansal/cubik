"use client";
import { Button } from '@cubik/ui';
import HeaderButtons from './header-buttons';
import Logo from './logo';
import React from 'react';
import Drawer from '@/app/home-page-components/drawer';
import NavigationItems from '@/app/home-page-components/navigationItems';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed left-0 top-0 z-10 w-screen border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] lg:static lg:overflow-y-visible">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex shrink-0 items-center">
            <a href="#">
              <Logo />
            </a>
          </div>
          <div className="hidden min-w-0 max-w-2xl flex-1 sm:block md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded border-0 bg-[var(--color-surface-secondary)] py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-white sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <HeaderButtons />
          <Button 
          // @ts-ignore
          onClick={setIsOpen} className='border border-violet-500 dark:text-white' size="sm">Menu</Button>
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <NavigationItems/>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
