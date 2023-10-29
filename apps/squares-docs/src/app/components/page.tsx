import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BreadCrumb from '../home-page-components/components/BreadCrumb';
import ComponentHeading from '../home-page-components/components/ComponentHeading';
import navigationData from '../navigationData';

export default function ComponentPage() {
  console.log('navigation data - ', navigationData);
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-start gap-12">
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
              <div className={`block text-xl text-[#0D0D0D]`}>
                {subItem.name}
              </div>
              {subItem.children && (
                // this is a card
                <ul className="flex list-none flex-row flex-wrap gap-6">
                  {subItem.children.map((thirdItem) => (
                    <Link
                      key={thirdItem.id}
                      href={thirdItem.link ? thirdItem.link : '#'}
                    >
                      <li className="flex flex-col gap-3">
                        {/*add a image here using next image */}

                        <div className="min-w-0 flex-1 overflow-hidden rounded-[8px] border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]">
                          <Image
                            src={thirdItem.image ? thirdItem.image : ''}
                            alt="My Image"
                            width={230}
                            height={180}
                          />
                        </div>
                        <span className=" text-md text-[var(--color-fg-primary)]">
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
