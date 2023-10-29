'use client';

import React from 'react';

import { Textarea } from '@cubik/ui';

const Textareas = () => {
  return (
    <div className="flex flex-col justify-start gap-5 px-10">
      <div className="font-2xl font-semibold">Textareas</div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">size</div>
        <Textarea size="sm" state="default" resizable={true} />
      </div>
    </div>
  );
};

export default Textareas;
