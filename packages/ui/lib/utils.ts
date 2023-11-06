import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // we are merging certain tailwind classes that we get from tailwind merge and then reconstructing them with tailwind merge
}

interface MediaCSS {
  type: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default';
  className: string;
}

export const handleMediaQuery = (mediaCSS: MediaCSS[]) => {
  let finalCss = '';

  mediaCSS.forEach((e) => {
    if (e.type === 'default') {
      finalCss = finalCss + e.className;
    }
    const classs = finalCss.split(' ');
    classs.forEach((cl) => {
      finalCss = finalCss + ' ' + e.type + ':' + cl;
    });
  });

  return finalCss;
};
