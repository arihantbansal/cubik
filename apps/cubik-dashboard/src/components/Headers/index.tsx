import React from "react";

export const Headers = () => {
  return (
    <>
      <div className="w-full dark:bg-neutral-800">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <p className="text-2xl font-bold uppercase tracking-[0.4rem] text-black dark:text-white  ">
            CUBIK
          </p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-500" />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
