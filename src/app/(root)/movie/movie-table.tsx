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
import { useQuery } from '@tanstack/react-query';
import { movieGet, type MovieData } from '@/lib/api/movie';

// function ProductNameCell({ name }: { name: string }) {
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

interface SelectedProductType {
  name: string;
  part: number;
  status: string;
}

export default function MovieTable() {
  const [movieDialog, setMovieDialog] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertDialogInfo, setAlertDialogInfo] = useState<{
    id: number;
    movie: string;
  }>({ id: 0, movie: '' });
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductType>({
    name: '',
    part: 0,
    status: '',
  });

  const handleEditClick = (product: SelectedProductType) => {
    setSelectedProduct(product);
    setMovieDialog(true);
  };

  const handleDeleteClick = ({ id, movie }: { id: number; movie: string }) => {
    setAlertDialogInfo({ id, movie });
    setAlertDialog(true);
  };

  // movie get
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movieGet(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  console.log(data?.length);
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
              {isLoading && isFetching && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {data?.map((product: MovieData & { id: number }) => (
                <TableRow key={product.id} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{product.id}</TableCell>
                  <TableCell>
                    <div className="md:hidden">
                      {product.name.length > 10 ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-left">
                              {product.name.slice(0, 10)}...
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-fit">
                            {product.name}
                          </PopoverContent>
                        </Popover>
                      ) : (
                        product.name
                      )}
                    </div>
                    <div className="hidden md:block">{product.name}</div>
                  </TableCell>
                  <TableCell>{product.part}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn('rounded', getStatusColor(product.status))}
                      variant="outline">
                      {product.status}
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
                          onSelect={() => handleEditClick(product)}>
                          <Pencil size={16} /> <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            handleDeleteClick({
                              id: product.id,
                              movie: product.name,
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
              {data?.length === 0 && (
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
        open={movieDialog}
        setOpen={setMovieDialog}
        defaultValues={{
          name: selectedProduct.name,
          part: selectedProduct.part,
          status: selectedProduct.status,
        }}
        onSubmit={(data, { reset }) => {
          console.log(data);
          reset();
        }}
      />
      {/* Dialog is rendered outside dropdown menu */}
      <AlertDeleteDialog
        title="Are you sure?"
        description={
          <p className=" text-pretty">
            Are you sure you want to delete the movie{' '}
            <span className="text-destructive">
              &quot;{alertDialogInfo.movie}&quot;
            </span>
            ?
          </p>
        }
        open={alertDialog}
        setOpen={setAlertDialog}
        onConfirm={() => {
          toast.error('Movie deleted successfully', {
            className: 'font-mono',
          });
        }}
      />
    </>
  );
}
