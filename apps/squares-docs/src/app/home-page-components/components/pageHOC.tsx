import React from 'react';

import BreadCrumb from './BreadCrumb';
import ComponentHeading from './ComponentHeading';

const PageHOC = ({
  children,
  pages,
  heading,
  description,
}: {
  children: React.ReactNode;
  pages: { name: string; href: string; current: boolean }[];
  heading: string;
  description: string;
}) => {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-start gap-12 px-4 sm:px-0">
      <BreadCrumb pages={pages} />
      <ComponentHeading heading={heading} description={description} />
      {children}
    </div>
  );
};


export default PageHOC;
