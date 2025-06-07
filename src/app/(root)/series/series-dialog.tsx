'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Separator } from '@/components/indie/separator';
import StatusSelect from '@/components/status-select';
import { useEffect } from 'react';
import { capitalCase } from 'text-case';

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Series name is required')
    .regex(
      /^[A-Za-z0-9\s]+$/,
      'Only English letters, numbers and spaces are allowed'
    )
    .transform((name) => capitalCase(name)),
  season: z.coerce.number().min(1, 'Part must be at least 1'),
  episode: z.coerce.number().min(1, 'Part must be at least 1'),
  status: z.string().min(1, 'Status is required'),
});

export type FormDataType = z.infer<typeof formSchema>;

type MovieDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: FormDataType, helpers: { reset: () => void }) => void;
  mode?: 'create' | 'edit';
  defaultValues?: Partial<FormDataType>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
};

export default function SeriesDialog({
  open,
  setOpen,
  onSubmit,
  mode = 'create',
  defaultValues = {},
  trigger,
  isLoading = false,
}: MovieDialogProps) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      season: 1,
      episode: 1,
      status: '',
    },
  });

  useEffect(() => {
    if (open && mode === 'edit') {
      form.reset({
        name: defaultValues.name,
        season: defaultValues.season,
        episode: defaultValues.episode,
        status: defaultValues.status,
      });
    }
  }, [open, mode, form]);

  const handleSubmit = (values: FormDataType) => {
    onSubmit(values, {
      reset: () => {
        if (mode === 'create') form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="aspect-square max-sm:p-0">
            <PlusIcon className="opacity-60 sm:-ms-1" size={16} />
            <span className="max-sm:sr-only">Add new</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sm:text-center">
            {mode === 'edit' ? 'Edit Series' : 'Add Series'}
          </DialogTitle>
          <DialogDescription className=" text-center">
            {mode === 'edit'
              ? 'Update your series info'
              : 'Add a series to your watchlist'}
          </DialogDescription>

          <Separator gradient className="mt-1" />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5 pt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series</FormLabel>
                  <FormControl>
                    <Input placeholder="Series Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Season Number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="episode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Episode</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Episode Number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <StatusSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                'Loading...'
              ) : (
                <>{mode === 'edit' ? 'Update' : 'Submit'}</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
