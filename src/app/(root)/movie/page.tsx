'use client';

import { Separator } from '@/components/indie/separator';
import Search from '@/components/search';
import StatusSelect from '@/components/status-select';
import { useState } from 'react';
import MovieDialog from './movie-dialog';
import Component from '@/components/comp-456';
import MovieTable from './movie-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moviePost, type MovieData } from '@/lib/api/movie';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { GeistMono } from 'geist/font/mono';

const Page = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [open, setOpen] = useState(false);
  console.log(search);
  // user session
  const { data: session } = useSession();
  // movie mutation
  const movieMutation = useMutation({
    mutationFn: async (data: MovieData) => moviePost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie'] });
      toast.success('Movie added successfully!', {
        className: `${GeistMono.className}`,
      });
      setOpen(false);
    },
    onError: (err) => {
      toast.error('Failed to add movie!', {
        className: `${GeistMono.className}`,
      });
      console.error(err);
    },
  });

  return (
    <div>
      <section className=" flex items-center gap-x-2 mt-3 mx-2 md:mx-0">
        <Search onSelect={setSearch} />
        <StatusSelect
          className="*:not-first:mt-2 flex-1 basis-0 select-none"
          value={status}
          onChange={setStatus}
          allOptions
        />
        <MovieDialog
          open={open}
          setOpen={setOpen}
          mode="create"
          onSubmit={(data, { reset }) => {
            movieMutation.mutate(
              { ...data, userId: Number(session?.user?.id) },
              {
                onSuccess: () => {
                  reset();
                  setOpen(false);
                },
              }
            );
          }}
          isLoading={movieMutation.isPending}
        />
      </section>
      <Separator gradient className="my-3" />
      <MovieTable />
      <Separator gradient className="my-3" />
      <div className="mx-2 md:mx-0">
        <Component currentPage={5} totalPages={10} />
      </div>
    </div>
  );
};

export default Page;
