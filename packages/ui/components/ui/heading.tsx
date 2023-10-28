import React, { FC } from 'react';

interface Props {
  size: 'sm' | 'lg' | 'md' | 'xs';
  subHeading?: React.ReactNode;
  heading: string;
  closeButton: boolean;
  overflow: boolean;
}

const Heading: FC<Props> = ({
  subHeading,
  size,
  heading,
  closeButton,
  overflow,
}) => {
  const sizeMap = new Map<string, string>();
  sizeMap.set('sm', '64px');
  sizeMap.set('lg', '88px');
  sizeMap.set('md', '78px');
  sizeMap.set('xs', '54px');
  return (
    <div
      className={`relative bg-[#EDEDED] w-full h-[${sizeMap.get(
        size,
      )}] flex flex-row items-center justify-start py-0 px-4 box-border gap-[256px] text-left text-3xl text-[#0D0D0D]font-text-sm-400`}
    >
      <div className="flex-1 flex flex-row items-center justify-start gap-[8px] z-[1]">
        <div className="rounded-md w-12 h-12 flex flex-row items-center justify-center p-3 box-border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#007BFF"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12v9.5m0-9.5L3.34 7.388M12 12l8.66-4.612M12 21.5c.217 0 .434-.022.648-.065.483-.099.938-.35 1.846-.853l4.012-2.22c.909-.503 1.363-.755 1.693-1.106.293-.312.513-.678.648-1.077.153-.45.153-.953.153-1.959V9.78c0-1.006 0-1.509-.153-1.96a2.924 2.924 0 0 0-.187-.432M12 21.5a3.25 3.25 0 0 1-.648-.065c-.483-.099-.938-.35-1.846-.853l-4.012-2.22c-.908-.503-1.363-.755-1.693-1.106a2.962 2.962 0 0 1-.648-1.077C3 15.73 3 15.226 3 14.22V9.78c0-1.006 0-1.509.153-1.96a2.89 2.89 0 0 1 .187-.432m17.32 0a2.986 2.986 0 0 0-.46-.643c-.331-.352-.785-.604-1.694-1.107l-4.012-2.22c-.909-.503-1.363-.754-1.846-.853a3.25 3.25 0 0 0-1.296 0c-.483.099-.938.35-1.846.853L7.5 4.528l-2.006 1.11c-.908.503-1.363.755-1.693 1.107a2.988 2.988 0 0 0-.461.643"
            />
          </svg>
        </div>
        <div className="flex-1 flex flex-col items-start justify-center gap-[2px]">
          <div className="relative leading-[30px] font-semibold">{heading}</div>
          {subHeading && (
            <div className="relative text-sm leading-[20px]">{subHeading}</div>
          )}
        </div>
        {closeButton && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#0D0D0D"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m6 18 6-6m0 0 6-6m-6 6L6 6m6 6 6 6"
            />
          </svg>
        )}
      </div>
      <div
        className={`absolute my-0 mx-[!important] top-[0px] left-[0px] w-[110px] h-[88px] ${
          !overflow && 'overflow-hidden'
        } shrink-0 z-[0]`}
      >
        <div className="absolute top-[-20px] left-[-24px] rounded-81xl box-border w-32 h-32 opacity-[0.01] border-[1px] border-solid border-color-[#007BFF]" />
        <div className="absolute top-[-12px] left-[-16px] rounded-81xl box-border w-28 h-28 opacity-[0.05] border-[1px] border-solid border-color-[#007BFF]" />
        <div className="absolute top-[-1px] left-[-5px] rounded-81xl box-border w-[90px] h-[90px] opacity-[0.1] border-[1px] border-solid border-[#007BFF]" />
        <div className="absolute top-[9px] left-[5px] rounded-19xl box-border w-[70px] h-[70px] opacity-[0.2] border-[1px] border-solid border-[#007BFF]" />
        <div className="absolute top-[20px] left-[16px] rounded-19xl box-border w-12 h-12 opacity-[0.6] border-[1px] border-solid border-color-[#007BFF]" />
      </div>
    </div>
  );
};

export default Heading;
