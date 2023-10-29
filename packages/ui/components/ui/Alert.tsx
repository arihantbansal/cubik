import React from 'react';

import { Icon } from '../../icons/icon';
import { Button } from './button';

type AlertTypes = 'Inline' | 'Text' | 'Border';
type AlertVariants = 'Info' | 'Loading' | 'Success' | 'Warning' | 'Error';
type AlertColors = 'Purple' | 'Red' | 'Green' | 'Blue' | 'Yellow';

interface AlertProps {
  type: AlertTypes;
  variant: AlertVariants;
  color: AlertColors;
  title: string;
  content: string;
  buttonText?: string;
  onButtonClick?: () => void;
  crossButton?: boolean;
  size?: 'small' | 'large';
}

const Alert: React.FC<AlertProps> = ({
  type,
  variant,
  color,
  title,
  content,
  buttonText,
  onButtonClick,
  crossButton = true,
  size = 'large',
}) => {
  const icons: Record<
    AlertVariants,
    'infoCircle' | 'Spinner' | 'doubleTick' | 'infoTriangle' | 'danger'
  > = {
    Info: 'infoCircle',
    Loading: 'Spinner',
    Success: 'doubleTick',
    Warning: 'infoTriangle',
    Error: 'danger',
  };

  const colorClasses = {
    Purple: {
      bg: 'bg-purple-100',
      border: 'border-purple-500',
      text: 'text-purple-700',
    },
    Red: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-700',
    },
    Green: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-700',
    },
    Blue: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-700',
    },
    Yellow: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
    },
  };

  const alertClasses = colorClasses[color];

  const typeStyles = {
    Inline: `${alertClasses.bg} rounded-[10px]`,
    Text: ``,
    Border: `${alertClasses.bg} border-l-2 border-solid ${alertClasses.border} rounded-r-[10px] pl-4`,
  };

  const sizeStyles = {
    small: 'text-xs sm:text-sm p-1 sm:p-2',
    large: 'text-md sm:text-lg p-2 sm:p-4',
  };

  const iconStyles = {
    small: 'w-4 h-4 sm:w-5 sm:h-5',
    large: 'w-6 h-6 sm:w-8 sm:h-8',
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-4 ${typeStyles[type]} ${alertClasses.text} ${sizeStyles[size]}`}
    >
      <Icon
        name={icons[variant]}
        className={`${alertClasses.text} ${iconStyles[size]}`}
        fill="none"
      />
      <div className="flex-grow mt-2 sm:mt-0">
        <div className="font-semibold">{title}</div>
        <div>{content}</div>
      </div>
      {buttonText && (
        <Button
          onClick={onButtonClick}
          className={`${alertClasses.border} ${alertClasses.text}`}
        >
          {buttonText}
        </Button>
      )}
      {crossButton && (
        <Icon
          name="cross"
          className={`${alertClasses.text} ${iconStyles[size]}`}
          fill="none"
        />
      )}
    </div>
  );
};

export { Alert };
export type { AlertVariants, AlertColors, AlertTypes };
