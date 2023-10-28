import React from 'react';
import { Button } from '@ui/components/ui/button';
import { Icon } from '@ui/icons/icon';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const alertVariants = {
  violet: {
    container: 'bg-violet-100',
    title: 'text-violet-400',
    content: 'text-violet-500',
    button: 'text-violet-400',
  },
  green: {},
  blue: {},
};

interface AlertProps extends VariantProps<typeof alertVariants> {
  title: string;
  content: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  content,
  buttonText,
  onButtonClick,
  variant = 'violet',
}) => {
  const classes = alertVariants[variant] || alertVariants.violet;

  return (
    <div
      className={cn(
        'w-[428px] h-12 px-3 py-2.5 rounded-[10px] flex justify-start items-center gap-2',
        classes.container,
      )}
    >
      <Icon
        name="Spinner"
        stroke="#9D7FF5"
        fill="none"
        height={16}
        width={16}
      />

      <div className="flex-grow flex h-7 justify-between items-center">
        <div className="flex-grow flex h-5 gap-2">
          <div
            className={cn(
              "text-center text-sm font-semibold font-['Inter'] leading-tight",
              classes.title,
            )}
          >
            {title}
          </div>
          <div
            className={cn(
              "text-sm font-normal font-['Inter'] leading-tight",
              classes.content,
            )}
          >
            {content}
          </div>
        </div>

        {buttonText && (
          <Button
            onClick={onButtonClick}
            className={cn(
              "text-sm font-semibold font-['Inter'] underline leading-tight",
              classes.button,
            )}
          >
            {buttonText}
          </Button>
        )}
      </div>

      <Icon
        name={'Cross'}
        stroke="#4D4D4D"
        fill="none"
        height={16}
        width={16}
      />
    </div>
  );
};

export default Alert;
