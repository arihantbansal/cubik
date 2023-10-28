import React from 'react';

const FilterLines = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        stroke="gray"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6.667 10h6.666m-4.166 5h1.666m-7.5-10h13.334"
      />
    </svg>
  );
});

export { FilterLines };
