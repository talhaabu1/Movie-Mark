'use client';

import { Separator } from '@/components/indie/separator';
import StatusSelect from '@/components/status-select';
import { useState } from 'react';
import MovieDialog from './movie-dialog';
import MovieTable from './movie-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { movieGet, moviePost, type MovieDataType } from '@/lib/api/movie';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { GeistMono } from 'geist/font/mono';
import { capitalCase } from 'text-case';
import { useMovieStore } from '@/store/movieStore';
import CustomPagination from '@/components/custom-pagination';
import Search from '@/components/search';

const Page = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  // movie store
  const { status, setStatus, page, setPage } = useMovieStore();

  // user session
  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  // movie mutation
  const movieMutation = useMutation({
    mutationFn: async (data: MovieDataType) => moviePost(data),
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

  // movie get
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['movie', userId, status, page],
    queryFn: () => movieGet({ userId, status, page, limit: 10 }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleSelect = (movieId: string) => {
    console.log('Selected Movie ID:', movieId);
  };

  return (
    <div>
      <section className=" flex items-center gap-x-2 mt-3 mx-2 md:mx-0">
        <Search onSelect={handleSelect} />
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
              {
                ...data,
                name: capitalCase(data.name),
                userId,
              },
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
      <MovieTable
        data={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <Separator gradient className="my-3" />
      <div className="mx-2 md:mx-0">
        <CustomPagination
          currentPage={page}
          totalPages={data?.meta?.totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Page;
