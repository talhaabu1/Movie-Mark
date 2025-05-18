'use client';

import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export const STATUS_OPTIONS = [
  { value: 'ALL', label: 'ALL', color: 'text-gray-500' },
  { value: 'WATCHING', label: 'WATCHING', color: 'text-sky-500' },
  { value: 'WATCHED', label: 'WATCHED', color: 'text-emerald-500' },
  { value: 'PLAN TO WATCH', label: 'PLAN TO WATCH', color: 'text-red-500' },
  { value: 'COMING SOON', label: 'COMING SOON', color: 'text-amber-500' },
];

type StatusSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  allOptions?: boolean;
};

export default function StatusSelect({
  value,
  onChange,
  className,
  allOptions = false,
}: StatusSelectProps) {
  const id = useId();

  const filteredOptions = allOptions
    ? STATUS_OPTIONS
    : STATUS_OPTIONS.filter((option) => option.value !== 'ALL');

  return (
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:w-full [&>span]:truncate">
          <SelectValue placeholder="Status..." />
        </SelectTrigger>

        <SelectContent>
          {filteredOptions.map(({ value, label, color }) => (
            <SelectItem key={value} value={value}>
              <span className="flex items-center gap-2 w-full truncate">
                <StatusDot className={color} />
                <span className="truncate">{label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
