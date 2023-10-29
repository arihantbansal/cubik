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
        pages={[{ name: 'Foundations', href: '/foundations', current: true }]}
      />
      <ComponentHeading
        heading={'Foundations'}
        description={
          'Squares provides prebuilt components to help you build faster. Here is an overview of the component categories'
        }
      />
      <div className="flex flex-row flex-wrap gap-8">
        {navigationData.map(
          (component) =>
            component.name === 'Foundations' &&
            component.children?.map((subItem) => (
              <Link key={subItem.id} href={subItem.link ? subItem.link : '#'}>
                <li className="flex flex-col gap-6">
                  {/*add a image here using next image */}
                  <div className="min-h-[180px] w-full max-w-[260px] flex-1 overflow-hidden rounded-[8px] border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]">
                    <Image
                      src={subItem.image ? subItem.image : ''}
                      alt="My Image"
                      className='h-[180px] object-cover object-left-top'
                      width={960}
                      height={540}
                    />
                  </div>
                  <span className=" text-md text-[var(--color-fg-primary)]">
                    {subItem.name}
                  </span>
                  {/* Implement logic for fourth level here if needed */}
                </li>
              </Link>
            )),
        )}
      </div>
    </div>
  );
}
