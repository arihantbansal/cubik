import React from 'react';

interface Props {
  type: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder: string;
  leftIcon: React.ReactNode;
}
export const Input = ({ type, id, name, placeholder, leftIcon }: Props) => {
  return (
    <>
      <div className="mt-2 flex rounded-[8px] shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
          {leftIcon}
        </span>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:px-2 placeholder:text-[var(--form-input-border-default)] focus:ring-2 focus:ring-inset focus:ring-[var(--form-input-border-focused)] sm:text-sm sm:leading-6"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
        </div>
      </div>
    </>
  );
};
