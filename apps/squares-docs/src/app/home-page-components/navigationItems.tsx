'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@cubik/ui';

import navigationData from '../navigationData';

const ListItem: FC<{ item: any; pathname: string }> = ({ item, pathname }) => {
  const [toggledSubItem, setToggledSubItem] = useState<number | null>(null);
  return (
    <li key={item.id} className="flex flex-col gap-2">
      <div className={`block gap-4 rounded`}>
        {item.children && (
          <span className="text-[14px] font-medium uppercase tracking-[3px] text-[var(--color-fg-tertiary)]">
            {item.name}
          </span>
        )}
      </div>
      {item.children && (
        <ul className="flex list-none flex-col gap-2">
          {item.children.map((subItem: any) => (
            <SubItem
              key={subItem.id}
              subItem={subItem}
              pathname={pathname}
              toggledSubItem={toggledSubItem}
              setToggledSubItem={setToggledSubItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const SubItem: FC<{
  subItem: any;
  pathname: string;
  toggledSubItem: number | null;
  setToggledSubItem: (id: number | null) => void;
}> = ({ subItem, pathname, toggledSubItem, setToggledSubItem }) => {
  const [toggledThirdItem, setToggledThirdItem] = useState<number | null>(null);
  return (
    <li key={subItem.id} className="flex min-w-[220px] flex-col gap-2">
      <Link href={subItem.link ? subItem.link : ''}>
        <div
          className={`block rounded px-4 py-2 ${
            pathname === subItem.link
              ? 'bg-[var(--color-purple-500)]'
              : 'hover:bg-gray-100'
          }`}
        >
          {subItem.children ? (
            <button
              onClick={() =>
                setToggledSubItem(
                  toggledSubItem === subItem.id ? null : subItem.id,
                )
              }
              className="mr-2 flex w-full flex-row items-center justify-between"
            >
              <span className="font-regular  text-[14px] text-[var(--color-fg-primary)]">
                {subItem.name}
              </span>
              <Icon
                name={'chevronDown'}
                stroke={'var(--color-fg-secondary)'}
                className={
                  toggledThirdItem === subItem.id ? 'rotate-180' : ''
                }
                strokeWidth={2}
                fill="none"
                height={16}
                width={16}
              />
            </button>
          ) : (
            <div className="mr-2 flex w-full flex-row items-center justify-between">
              <span className="font-regular text-[14px] text-[var(--color-fg-primary)]">
                {subItem.name}
              </span>
            </div>
          )}
        </div>
      </Link>
      {subItem.children && toggledSubItem === subItem.id && (
        <ul className="list-none pl-4">
          {subItem.children.map((thirdItem: any) => (
            <ThirdItem
              key={thirdItem.id}
              thirdItem={thirdItem}
              pathname={pathname}
              toggledThirdItem={toggledThirdItem}
              setToggledThirdItem={setToggledThirdItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ThirdItem: FC<{
  thirdItem: any;
  pathname: string;
  toggledThirdItem: number | null;
  setToggledThirdItem: (id: number | null) => void;
}> = ({ thirdItem, pathname, toggledThirdItem, setToggledThirdItem }) => {
  return (
    <li key={thirdItem.id} className="my-1">
      <Link href={thirdItem.link ? thirdItem.link : '#'}>
        <div
          className={`block rounded px-4 py-2 ${
            pathname === thirdItem.link
              ? 'bg-[var(--color-surface-purple)] font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              : 'hover:bg-gray-100'
          }`}
        >
          {thirdItem.children ? (
            <button
              onClick={() =>
                setToggledThirdItem(
                  toggledThirdItem === thirdItem.id ? null : thirdItem.id,
                )
              }
              className="mr-2"
            >
              <span
                className={`${
                  pathname === thirdItem.link ? 'text-purple-500' : 'text-black'
                } text-[14px]`}
              >
                {thirdItem.name}
              </span>
              <Icon
                className={
                  toggledThirdItem === thirdItem.id
                    ? 'rotate-180'
                    : ''
                }
                name={'chevronDown'}
                stroke={'var(--color-fg-secondary)'}
                strokeWidth={2}
                fill="none"
                height={16}
                width={16}
              />
            </button>
          ) : (
            <div className="mr-2 flex w-full flex-row items-center justify-between">
              <span
                className={`${
                  pathname === thirdItem.link
                    ? 'text-[var(--color-purple-500)]'
                    : 'text-[var(--color-fg-primary)]'
                } text-[14px]`}
              >
                {thirdItem.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

const NavigationItems: FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex w-fit list-none flex-col gap-4 pl-0">
      {navigationData.map((item) => (
        <ListItem key={item.id} item={item} pathname={pathname} />
      ))}
    </ul>
  );
};

export default NavigationItems;
