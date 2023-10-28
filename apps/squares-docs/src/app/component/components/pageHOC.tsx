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
    <div className="w-full max-w-[1200px] mx-auto flex justify-start flex-col gap-12">
      <BreadCrumb pages={pages} />
      <ComponentHeading heading={heading} description={description} />
      {children}
    </div>
  );
};

export default PageHOC;
