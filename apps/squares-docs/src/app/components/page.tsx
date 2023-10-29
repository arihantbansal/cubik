import React from "react";
import BreadCrumb from "../home-page-components/components/BreadCrumb";
import navigationData from "../navigationData";
import Link from "next/link";
import ComponentHeading from "../home-page-components/components/ComponentHeading";
import Image from "next/image";

export default function ComponentPage() {
  console.log('navigation data - ', navigationData);
  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-start flex-col gap-12">
      <BreadCrumb
        pages={[{ name: 'Components', href: '/component', current: true }]}
      />
      <ComponentHeading
        heading={'Components'}
        description={
          'Squares provides prebuilt components to help you build faster. Here is an overview of the component categories'
        }
      />
      {navigationData.map(
        (component) =>
          component.name === 'Components' &&
          component.children?.map((subItem) => (
            <div key={subItem.id} className="flex flex-col gap-6">
              <div className={`block text-[#0D0D0D] text-xl`}>
                {subItem.name}
              </div>
              {subItem.children && (
                // this is a card
                <ul className="list-none flex flex-row gap-6 flex-wrap">
                  {subItem.children.map((thirdItem) => (
                    <Link
                      key={thirdItem.id}
                      href={thirdItem.link ? thirdItem.link : '#'}
                    >
                      <li className="flex flex-col gap-3">
                        {/*add a image here using next image */}

                        <div className="flex-1 overflow-hidden bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-[8px] min-w-0">
                          <Image
                            src={thirdItem.image ? thirdItem.image : ''}
                            alt="My Image"
                            width={230}
                            height={180}
                          />
                        </div>
                        <span className=" text-[var(--color-fg-primary)] text-md">
                          {thirdItem.name}
                        </span>
                        {/* Implement logic for fourth level here if needed */}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          )),
      )}
    </div>
  );
}
