/* eslint-disable import/no-extraneous-dependencies */
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cn(...input: any[]) {
  return twMerge(input);
}
