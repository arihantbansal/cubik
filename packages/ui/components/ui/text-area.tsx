import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const textareaVariants = cva(
  'flex h-40 w-[30.5rem] px-3 py-4 shrink-0 rounded-lg border placeholder:text-base',
  {
    variants: {
      size: {
        sm: 'input-sm',
        md: '',
      },
      state: {
        default:
          'bg-[var(--form-input-surface-default)] border-[var(--form-input-border-default)] placeholder:text-[var(--form-input-placeholder-default)]',
        focused:
          'bg-[var(--form-input-surface-focused)] border-[var(--form-input-border-focused)] placeholder:text-[var(--form-input-placeholder-focused)]',
        error:
          'bg-[var(--form-input-surface-error)] border-[var(--form-input-border-error)] placeholder:text-[var(--form-input-placeholder-error)]',
        hovered:
          'bg-[var(--form-input-surface-hovered)] border-[var(--form-input-border-hovered)] placeholder:text-[var(--form-input-placeholder-hovered)]',
        disabled:
          'bg-[var(--form-input-surface-disabled)] border-[var(--form-input-border-disabled)] placeholder:text-[var(--form-input-placeholder-disabled)]',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
);
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  resizable: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, state, resizable, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          className,
          !resizable && 'resize-none',
          textareaVariants({ size, state }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
