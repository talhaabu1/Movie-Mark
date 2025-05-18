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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Separator } from '../../../components/indie/separator';
import StatusSelect from '../../../components/status-select';

const formSchema = z.object({
  movie: z.string().min(1, 'Movie name is required'),
  part: z.coerce.number().min(1, 'Part must be at least 1'),
  status: z.string().min(1, 'Status is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function MovieDialog() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movie: '',
      part: 1,
      status: '',
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="aspect-square max-sm:p-0">
          <PlusIcon className="opacity-60 sm:-ms-1" size={16} />
          <span className="max-sm:sr-only">Add new</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Add Movie</DialogTitle>
          <Separator gradient className="mt-1" />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-2">
            <FormField
              control={form.control}
              name="movie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie</FormLabel>
                  <FormControl>
                    <Input placeholder="Movie name..." {...field} />
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

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
