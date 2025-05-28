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

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Movie name is required')
    .regex(
      /^[A-Za-z0-9\s]+$/,
      'Only English letters, numbers and spaces are allowed'
    ),
  part: z.coerce.number().min(1, 'Part must be at least 1'),
  status: z.string().min(1, 'Status is required'),
});

export type FormData = z.infer<typeof formSchema>;

type MovieDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: FormData, helpers: { reset: () => void }) => void;
  mode?: 'create' | 'edit';
  defaultValues?: Partial<FormData>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
};

export default function MovieDialog({
  open,
  setOpen,
  onSubmit,
  mode = 'create',
  defaultValues = {},
  trigger,
  isLoading = false,
}: MovieDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      part: 1,
      status: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (open && defaultValues && mode === 'edit') {
      form.reset({
        name: defaultValues.name ?? '',
        part: defaultValues.part ?? 1,
        status: defaultValues.status ?? '',
      });
    }
  }, [open, defaultValues, form, mode]);

  const handleSubmit = (values: FormData) => {
    onSubmit(values, {
      reset: () => {
        form.reset();
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
            {mode === 'edit' ? 'Edit Movie' : 'Add Movie'}
          </DialogTitle>
          <DialogDescription className=" text-center">
            {mode === 'edit'
              ? 'Update your movie info'
              : 'Add a movie to your watchlist'}
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
                  <FormLabel>Movie</FormLabel>
                  <FormControl>
                    <Input placeholder="Movie Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="part"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Part</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Part number..."
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
