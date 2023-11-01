import React from 'react';
import * as RadixProgress from '@radix-ui/react-progress';

interface Props {
  defaultProgress: number;
}
export const Progress = ({ defaultProgress }: Props) => {
  const [progress, setProgress] = React.useState(defaultProgress ?? 13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <RadixProgress.Root
        className="relative overflow-hidden bg-black rounded-full w-[300px] h-[25px]"
        style={{
          transform: 'translateZ(0)',
        }}
        value={progress}
      >
        <RadixProgress.Indicator
          className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </RadixProgress.Root>
    </>
  );
};
