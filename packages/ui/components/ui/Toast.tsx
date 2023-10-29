'use client';

import React, { useEffect, useState } from 'react';

import { Alert, AlertColors, AlertTypes, AlertVariants } from './Alert';

interface ToastProps {
  title: string;
  content: string;
  buttonText?: string;
  onButtonClick?: () => void;
  duration?: number;
  color?: AlertColors;
  type?: AlertTypes;
  variant?: AlertVariants;
}

const Toast: React.FC<ToastProps> = ({
  title,
  content,
  buttonText,
  onButtonClick,
  duration = 5000,
  color = 'Blue',
  type = 'Inline',
  variant = 'Info',
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Alert
        title={title}
        content={content}
        color={color}
        type={type}
        variant={variant}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
      />
    </div>
  );
};

export default Toast;
