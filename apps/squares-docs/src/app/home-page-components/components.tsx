import React from 'react';

const Background = () => {
  return (
    <div className="relative z-[-1]">
      <div className="absolute right-[-50px] top-[-340px] z-0 h-[446px] w-[462px] rounded-full bg-yellow-500 bg-opacity-30 blur-[120px]"></div>
      <div className="absolute right-[250px] top-[-480px] z-0 h-[306px] w-[382px] rounded-full bg-blue-500 bg-opacity-30 blur-[120px]"></div>
      <div className="absolute right-[500px] top-[-460px] z-0 h-[446px] w-[462px] rounded-full bg-red-500 bg-opacity-30 blur-[120px]"></div>
      <div className="absolute left-[-50px] top-[-580px] z-0 h-[600px] w-[600px] rounded-full bg-green-500 bg-opacity-30 blur-[180px]"></div>
    </div>
  );
};

export default Background;
