import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Spinner from '../../icons/svgs/spinner';
import Upload02 from '../../icons/svgs/upload-02';

// interface Props extends React.InputHTMLAttributes<HTMLElement> {
//   symbol: React.ReactNode;
//   heading: React.ReactNode;
//   sub: React.ReactNode;
// }

const ImageUpload: FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dark relative bg-[#333333] box-border flex w-full flex-row items-center justify-start gap-4 rounded-lg border border-dashed border-[#4d4d4d] p-4 text-left text-sm text-white"
    >
      <div className="flex flex-row items-start justify-start rounded bg-[#4d4d4d] p-4">
        <div className="relative h-5 w-5 overflow-hidden">
          {isDragActive ? <Spinner /> : <Upload02 />}
        </div>
      </div>
      <input {...getInputProps()} />
      <div className="flex flex-1 flex-col items-start justify-start gap-1">
        {!isDragActive ? (
          <div className="flex h-6 flex-row items-start justify-start self-stretch gap-1">
            <div className="relative font-medium leading-5">
              Drop, Paste here or
            </div>
            <div className="relative font-medium leading-5 text-[#b2b2b2]">
              <span>{`  `}</span>
              <span className="text-[#007bff]">Browse</span>
            </div>
          </div>
        ) : (
          <div className="relative font-medium leading-5">
            Drop/Paste Image here
          </div>
        )}
        <div className="flex flex-row items-center justify-center self-stretch px-0 py-1 text-xs text-[#808080]">
          <div className="relative leading-4">
            Recommended size: 240*250 | JPG, PNG, GIF. Max size: 2MB
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
