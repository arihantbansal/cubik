import React from 'react';

import { InputField } from '../InputField';

interface Props extends React.HTMLProps<HTMLInputElement> {
  helperText: React.ReactNode;
  InputLabel: React.ReactNode;
  isError: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  isHttps?: boolean;
  inputvariant: 'md' | 'sm';
}
export const Input = (props: Props) => {
  return (
    <>
      <div className="flex justify-center w-full flex-col items-start gap-1">
        {props.InputLabel}
        <InputField
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          type={props.type ?? 'text'}
          isDisabled={props.disabled}
          leftElement={props.leftElement}
          rightElement={props.rightElement}
          isHttps={props.isHttps}
          variant={props.inputvariant}
          {...props}
        />
        {props.helperText}
      </div>
    </>
  );
};
