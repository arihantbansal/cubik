"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import navigationData from "../navigationData";
import { Icon } from "@cubik/ui";

const ListItem: FC<{ item: any; pathname: string }> = ({ item, pathname }) => {
  const [toggledSubItem, setToggledSubItem] = useState<number | null>(null);
  return (
    <li key={item.id} className="flex flex-col gap-2">
      <div className={`block rounded gap-4`}>
        {item.children && (
          <span className="text-[var(--color-fg-tertiary)] uppercase tracking-[3px] font-medium text-[14px]">
            {item.name}
          </span>
        )}
      </div>
      {item.children && (
        <ul className="list-none flex flex-col gap-2">
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
    <li key={subItem.id} className="flex flex-col gap-2 min-w-[220px]">
      <Link href={subItem.link ? subItem.link : ""}>
        <div
          className={`block px-4 py-2 rounded ${
            pathname === subItem.link
              ? "bg-[var(--color-purple-500)]"
              : "hover:bg-gray-100"
          }`}
        >
          {subItem.children ? (
            <button
              onClick={() =>
                setToggledSubItem(
                  toggledSubItem === subItem.id ? null : subItem.id
                )
              }
              className="mr-2 flex flex-row items-center justify-between w-full"
            >
              <span className="text-[var(--color-fg-primary)]  text-[14px] font-regular">
                {subItem.name}
              </span>
              <Icon
                name={"chevronDown"}
                stroke={"var(--color-fg-secondary)"}
                className={
                  toggledThirdItem === subItem.id
                    ? "transform rotate-180"
                    : ""
                }
                strokeWidth={2}
                fill="none"
                height={16}
                width={16}
              />
            </button>
          ) : (
            <div className="mr-2 flex flex-row items-center justify-between w-full">
              <span className="text-[var(--color-fg-primary)] text-[14px] font-regular">
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
      <Link href={thirdItem.link ? thirdItem.link : "#"}>
        <div
          className={`block px-4 py-2 rounded ${
            pathname === thirdItem.link
              ? "bg-[var(--color-surface-purple)] font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
              : "hover:bg-gray-100"
          }`}
        >
          {thirdItem.children ? (
            <button
              onClick={() =>
                setToggledThirdItem(
                  toggledThirdItem === thirdItem.id ? null : thirdItem.id
                )
              }
              className="mr-2"
            >
              <span
                className={`${
                  pathname === thirdItem.link ? "text-purple-500" : "text-black"
                } text-[14px]`}
              >
                {thirdItem.name}
              </span>
              <Icon
                className={
                  toggledThirdItem === thirdItem.id
                    ? "transform rotate-180"
                    : ""
                }
                name={"chevronDown"}
                stroke={"var(--color-fg-secondary)"}
                strokeWidth={2}
                fill="none"
                height={16}
                width={16}
              />
            </button>
          ) : (
            <div className="mr-2 flex flex-row items-center justify-between w-full">
              <span
                className={`${
                  pathname === thirdItem.link
                    ? "text-[var(--color-purple-500)]"
                    : "text-[var(--color-fg-primary)]"
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
    <ul className="list-none pl-0 w-fit flex flex-col gap-4">
      {navigationData.map((item) => (
        <ListItem key={item.id} item={item} pathname={pathname} />
      ))}
    </ul>
  );
};

export default NavigationItems;
