import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // we are merging certain tailwind classes that we get from tailwind merge and then reconstructing them with tailwind merge
}
