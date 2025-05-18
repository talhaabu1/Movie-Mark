import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'WATCHING':
      return 'text-sky-500';
    case 'WATCHED':
      return 'text-emerald-500';
    case 'PLAN TO WATCH':
      return 'text-indigo-400';
    case 'COMING SOON':
      return 'text-amber-500';
    default:
      return 'text-gray-500';
  }
}
