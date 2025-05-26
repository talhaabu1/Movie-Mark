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

interface SearchItem {
  id: number;
  name: string;
}

interface Props {
  placeholder: string;
  search: string;
  setSearch: (value: string) => void;
  queryKey: string;
  queryFn: (search: string) => Promise<SearchItem[]>;
}

const Search = ({
  search,
  setSearch,
  queryKey,
  queryFn,
  placeholder,
}: Props) => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const debounced = useDebounce(value, 300);

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, debounced],
    queryFn: () => queryFn(debounced),
    enabled: open,
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
                        setValue('');
                      }}
                      aria-label="Clear selection"
                      className="p-0 hover:bg-transparent flex items-center justify-center cursor-pointer">
                      <X size={16} className="shrink-0" />
                    </span>
                  )}
                  <ChevronDownIcon
                    size={16}
                    className="text-muted-foreground/80 shrink-0"
                    aria-hidden="true"
                  />
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
              value={value}
              onValueChange={setValue}
            />
            <CommandList>
              {isLoading ? (
                <p className="py-6 text-center text-sm">Loading...</p>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

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
                    }}>
                    {item.name}
                    {search === item.name && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Search;
