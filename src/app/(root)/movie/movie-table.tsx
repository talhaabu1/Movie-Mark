'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EllipsisIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn, getStatusColor } from '@/lib/utils';
import MovieDialog from '@/app/(root)/movie/movie-dialog';
import { useState } from 'react';
import AlertDeleteDialog from '@/components/alert-dialog';
import { toast } from 'sonner';
import { movieDelete, movieUpdate } from '@/lib/api/movie';
import { GeistMono } from 'geist/font/mono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Movie, MovieUpdateInput } from '@/types/movie';

// function itemNameCell({ name }: { name: string }) {
//   const isMobile = useMediaQuery('(max-width: 767px)');

//   if (name.length <= 10) return <span>{name}</span>;

//   if (isMobile) {
//     return (
//       <Popover>
//         <PopoverTrigger asChild>
//           <button className="text-left">{name.slice(0, 10)}...</button>
//         </PopoverTrigger>
//         <PopoverContent className="max-w-xs">{name}</PopoverContent>
//       </Popover>
//     );
//   }

//   return <span>{name}</span>; // Desktop full show
// }

type SelectedMovieType = Pick<Movie, 'id' | 'name' | 'part' | 'status'>;

interface Props {
  data: Array<Movie>;
  isLoading: boolean;
  isFetching: boolean;
}

export default function MovieTable({ data, isLoading, isFetching }: Props) {
  const queryClient = useQueryClient();

  const [movieDialog, setMovieDialog] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertDialogInfo, setAlertDialogInfo] = useState<
    Pick<Movie, 'id' | 'name'>
  >({ id: 0, name: '' });

  const [selectedMovie, setSelectedMovie] = useState<SelectedMovieType>({
    id: 0,
    name: '',
    part: 0,
    status: '',
  });

  const handleEditClick = (item: SelectedMovieType) => {
    setSelectedMovie(item);
    setMovieDialog(true);
  };

  const handleDeleteClick = ({ id, name }: Pick<Movie, 'id' | 'name'>) => {
    setAlertDialogInfo({ id, name });
    setAlertDialog(true);
  };

  // movie delete mutation
  const movieDeleteMutation = useMutation({
    mutationFn: async (id: number) => movieDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie'] });
      queryClient.invalidateQueries({ queryKey: ['search'] });

      toast.success('Movie deleted successfully!', {
        className: `${GeistMono.className}`,
      });
    },
    onError: (err) => {
      toast.error('Failed to delete movie!', {
        className: `${GeistMono.className}`,
      });
      console.error(err);
    },
  });

  // movie update mutation
  const movieUpdateMutation = useMutation({
    mutationFn: ({ name, part, status }: MovieUpdateInput) =>
      movieUpdate(selectedMovie.id, { name, part, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie'] });
      queryClient.invalidateQueries({ queryKey: ['search'] });
      toast.success('Movie updated successfully!', {
        className: `${GeistMono.className}`,
      });
    },
    onError: (err) => {
      toast.error('Failed to update movie!', {
        className: `${GeistMono.className}`,
      });
      console.error(err);
    },
  });

  return (
    <>
      <div className="mx-1 md:mx-0">
        <div className="w-full border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">ID</TableHead>
                <TableHead>Movie</TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isLoading || isFetching) && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!(isLoading || isFetching) &&
                data?.map((item) => (
                  <TableRow key={item.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{item.id}</TableCell>
                    <TableCell>
                      <div className="md:hidden">
                        {item.name.length > 10 ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="text-left">
                                {item.name.slice(0, 10)}...
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit">
                              {item.name}
                            </PopoverContent>
                          </Popover>
                        ) : (
                          item.name
                        )}
                      </div>
                      <div className="hidden md:block">{item.name}</div>
                    </TableCell>
                    <TableCell>{item.part}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn('rounded', getStatusColor(item.status))}
                        variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full shadow-none"
                            aria-label="Open edit menu">
                            <EllipsisIcon size={16} aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => handleEditClick(item)}>
                            <Pencil size={16} /> <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleDeleteClick({
                                id: item.id,
                                name: item.name,
                              })
                            }
                            className=" text-destructive">
                            <Trash2 size={16} /> <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              {data?.length === 0 && !isLoading && !isFetching && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Dialog is rendered outside dropdown menu */}
      <MovieDialog
        mode="edit"
        trigger={<p className="hidden">hidden</p>}
        isLoading={movieUpdateMutation.isPending}
        open={movieDialog}
        setOpen={setMovieDialog}
        defaultValues={{
          name: selectedMovie.name,
          part: selectedMovie.part,
          status: selectedMovie.status,
        }}
        onSubmit={(data, { reset }) => {
          movieUpdateMutation.mutate(data, {
            onSuccess: () => {
              reset();
            },
          });
        }}
      />
      {/* Dialog is rendered outside dropdown menu */}
      <AlertDeleteDialog
        title="Are you sure?"
        description={
          <p className=" text-pretty">
            Are you sure you want to delete the movie{' '}
            <span className="text-destructive">
              &quot;{alertDialogInfo.name}&quot;
            </span>
            ?
          </p>
        }
        open={alertDialog}
        setOpen={setAlertDialog}
        onConfirm={() => {
          movieDeleteMutation.mutate(alertDialogInfo.id);
        }}
      />
    </>
  );
}
