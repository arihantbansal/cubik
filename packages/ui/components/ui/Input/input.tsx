import React from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  helperText?: React.ReactNode;
  InputLabel?: React.ReactNode;
  isError?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  isHttps?: boolean;
  inputvariant?: 'md' | 'sm';
}
export const InputContainer = (props: Props) => {
  return (
    <>
      <div className="flex justify-center w-full flex-col items-start gap-1">
        {props.children}
      </div>
    </>
  );
};
