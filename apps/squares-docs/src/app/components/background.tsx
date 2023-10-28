import React from 'react';

const Background = () => {
  return (
    <div className="relative z-[-1]">
      <div className="absolute top-[-340px] right-[-50px] w-[462px] h-[446px] rounded-full bg-yellow-500 bg-opacity-30 filter blur-[120px] z-0"></div>
      <div className="absolute top-[-480px] right-[250px] w-[382px] h-[306px] rounded-full bg-blue-500 bg-opacity-30 filter blur-[120px] z-0"></div>
      <div className="absolute top-[-460px] right-[500px] w-[462px] h-[446px] rounded-full bg-red-500 bg-opacity-30 filter blur-[120px] z-0"></div>
      <div className="absolute top-[-580px] left-[-50px] w-[600px] h-[600px] rounded-full bg-green-500 bg-opacity-30 filter blur-[180px] z-0"></div>
    </div>
  );
};

export default Background;
