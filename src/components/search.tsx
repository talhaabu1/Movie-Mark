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

const frameworks = [
  {
    value: 'next.jsrrrrrrrr',
    label: 'Next.jsrrrrrrrr',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'angular',
    label: 'Angular',
  },
  {
    value: 'vue',
    label: 'Vue.js',
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'ember',
    label: 'Ember.js',
  },
  {
    value: 'gatsby',
    label: 'Gatsby',
  },
  {
    value: 'eleventy',
    label: 'Eleventy',
  },
  {
    value: 'solid',
    label: 'SolidJS',
  },
  {
    value: 'preact',
    label: 'Preact',
  },
  {
    value: 'qwik',
    label: 'Qwik',
  },
  {
    value: 'alpine',
    label: 'Alpine.js',
  },
  {
    value: 'lit',
    label: 'Lit',
  },
];

interface Props {
  onSelect: (value: string) => void;
}

const Search = ({ onSelect }: Props) => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

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
                  className={cn('truncate', !value && 'text-muted-foreground')}>
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Search...'}
                </span>
                <div className="flex items-center justify-end gap-1 ml-3">
                  {value && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
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
            <CommandInput placeholder="Movie Name..." />
            <CommandList>
              <CommandEmpty>No Movie found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      const newValue =
                        currentValue === value ? '' : currentValue;
                      onSelect(newValue);
                      setValue(newValue);
                      setOpen(false);
                    }}>
                    {framework.label}
                    {value === framework.value && (
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
