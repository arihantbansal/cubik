import React from 'react';

const ComponentHeading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-5xl text-[var(--color-fg-primary)]">{heading}</p>
      <div className="text-md text-[var(--color-fg-secondary)]">
        {description}
      </div>
    </div>
  );
};

export default ComponentHeading;
