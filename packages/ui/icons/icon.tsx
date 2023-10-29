import * as React from 'react';
import clsx from 'clsx';

import { iconLibrary } from './iconLibrary';

type IconName = keyof typeof iconLibrary;

type Props = {
  name: IconName;
  height?: number;
  width?: number;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  className?: string;
};
export const Icon = ({
  name,
  height = 24,
  width = 24,
  strokeWidth = 2,
  fill = '#fff',
  stroke = '#CCCCCC',
  className,
}: Props) => {
  const renderedPaths = iconLibrary[name]?.paths.map(
    (path: string, index: number) => <path key={index} d={path}></path>,
  );

  const viewBox = iconLibrary[name]?.viewBox;

  return (
    <svg
      viewBox={viewBox}
      className={clsx(' text-white', className)}
      strokeWidth={strokeWidth}
      fill={fill}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={width}
      height={height}
    >
      {renderedPaths}
    </svg>
  );
};
