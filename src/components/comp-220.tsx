import { useId } from 'react';

import { Label } from '@/components/ui/label';
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

export default function Component1() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2 flex-1 basis-0">
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:w-full [&>span]:truncate">
          <SelectValue placeholder="Status..." />
        </SelectTrigger>

        <SelectContent>
          {[
            { value: '1', label: 'ALL', color: 'text-gray-500' },
            { value: '2', label: 'WATCHING', color: 'text-blue-500' },
            { value: '3', label: 'WATCHED', color: 'text-emerald-600' },
            { value: '4', label: 'PLAN TO WATCH', color: 'text-red-500' },
            { value: '5', label: 'COMING SOON', color: 'text-amber-500' },
          ].map(({ value, label, color }) => (
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
