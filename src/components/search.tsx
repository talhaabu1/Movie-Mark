'use client';

import { useId, useState } from 'react';
import { CheckIcon, ChevronDownIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Skeleton } from './ui/skeleton';

interface SearchItem {
  id: number;
  name: string;
}

interface Props {
  placeholder: string;
  search: string;
  status: string;
  setSearch: (value: string) => void;
  queryKey: string;
  queryFn: ({
    search,
    status,
  }: {
    search: string;
    status: string;
  }) => Promise<SearchItem[]>;
  setPage?: (value: number) => void;
}

const Search = ({
  search,
  status,
  setSearch,
  queryKey,
  queryFn,
  setPage,
  placeholder,
}: Props) => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const debounced = useDebounce(query, 300);

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, debounced, status],
    queryFn: () => queryFn({ search: debounced, status }),
    staleTime: 1000 * 60 * 1,
    enabled: debounced.length >= 1,
  });

  return (
    <div className="*:not-first:mt-2 flex-1 basis-0 truncate">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full">
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Search dropdown"
              className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
              <div className="flex items-center justify-between w-full">
                <span
                  className={cn(
                    'truncate',
                    !search && 'text-muted-foreground'
                  )}>
                  {search || 'Search...'}
                </span>
                <div className="flex items-center justify-end gap-1 ml-3">
                  {search && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearch('');
                        setQuery('');
                      }}
                      aria-label="Clear selection"
                      className="p-0 hover:bg-transparent flex items-center justify-center cursor-pointer">
                      <X size={16} className="shrink-0" />
                    </span>
                  )}
                  {!search && (
                    <ChevronDownIcon
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {isLoading && (
                <>
                  <div className="space-y-3 px-2 py-2">
                    <Skeleton className="h-[32px] w-full" />
                    <Skeleton className="h-[32px] w-full" />
                    <Skeleton className="h-[32px] w-full" />
                  </div>
                </>
              )}

              {debounced.length >= 1 && !isLoading && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {data && data.length > 0 && (
                <CommandGroup>
                  {data?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={(currentValue) => {
                        const newValue =
                          currentValue === search ? '' : currentValue;
                        setSearch(newValue);
                        setOpen(false);
                        setPage?.(1);
                      }}>
                      {item.name}
                      {search === item.name && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Search;
