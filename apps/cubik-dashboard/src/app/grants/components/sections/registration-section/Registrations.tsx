import React from 'react';

import { EmailCard } from './cards/EmailCard';
import { TableCard } from './table/TableCard';

export const RegistrationsSection = () => {
  const segments = [
    { color: 'bg-surface-orange-500', width: 10 },
    { color: 'bg-surface-blue-400', width: 10 },
    { color: 'bg-surface-red-600', width: 10 },
  ];
  return (
    <>
      <div>
        <div className="flex justify-between items-center my-5 px-3 md:px-0 ">
          <h3 className="dark:text-white text-black font-semibold text-2xl flex gap-2">
            Registration
            <span className="hidden md:block">Overview</span>
          </h3>
          <div className="flex gap-5">
            <button className="btn-base bg-white text-surface-blue-500 dark:text-white dark:bg-neutral-800 flex justify-center items-center gap-2">
              <p className="hidden md:block">Set Capacity</p>
              <div>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33332 2.66671L12.6667 2.66671M12 9.22031C10.9629 7.81804 9.75147 6.5586 8.3962 5.47306C8.27994 5.37993 8.13997 5.33337 7.99999 5.33337M3.99999 9.22031C5.03703 7.81804 6.24851 6.5586 7.60378 5.47306C7.72004 5.37993 7.86001 5.33337 7.99999 5.33337M7.99999 5.33337L7.99999 13.3334"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
            <button className="btn-danger">Close Registration</button>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-3 md:px-0">
          <div className="flex justify-between items-center mt-10">
            <h3 className="text-surface-blue-400 font-normal text-lg">
              <span className="font-semibold text-2xl">5</span> New Registration
            </h3>
            <h3 className="text-surface-neutral-500 font-normal text-lg">
              capacity <span className="font-semibold text-2xl">10</span>
            </h3>
          </div>
          <div className="w-full h-6 bg-surface-neutral-880 rounded-lg overflow-hidden flex ">
            {segments.map((segment, index) => (
              <div
                key={index}
                className={`h-full ${segment.color}`}
                style={{ width: `${segment.width}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between items-center gap-5 flex-col md:flex-row ">
            <EmailCard
              color="bg-surface-orange-500"
              count={10}
              type="Accepted"
            />
            <EmailCard color="bg-surface-blue-400" count={10} type="Received" />
            <EmailCard color="bg-surface-red-600" count={10} type="Declined" />
          </div>
        </div>
        <div className="px-3 md:px-0">
          <div className="flex justify-between items-center h-14 my-7">
            <p className="font-semibold text-2xl">Project</p>
            <button className="bg-neutral-800 px-5 py-2 rounded-md text-base flex items-center gap-2">
              <span>Download List</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6667 13.3334H3.33334M4.00001 6.77975C5.03705 8.18202 6.24853 9.44146 7.6038 10.527C7.72006 10.6201 7.86003 10.6667 8.00001 10.6667M12 6.77975C10.963 8.18202 9.75149 9.44146 8.39622 10.527C8.27996 10.6201 8.13999 10.6667 8.00001 10.6667M8.00001 10.6667V2.66669"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <TableCard />
      </div>
    </>
  );
};
