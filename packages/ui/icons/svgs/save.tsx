import React from 'react';
import { cn } from '@ui/lib/utils';

export const SaveIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    {...props}
    className={cn(
      'relative w-[18px] h-[18px] overflow-hidden shrink-0',
      className,
    )}
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z"
    />
  </svg>
));

SaveIcon.displayName = 'SaveIcon';
