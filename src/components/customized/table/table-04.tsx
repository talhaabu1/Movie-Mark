'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, EllipsisIcon, Pencil, Trash2 } from 'lucide-react';

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
import { useState, type SetStateAction } from 'react';

const products = [
  {
    id: 101,
    name: 'Dragon',
    part: 2,
    status: 'WATCHED',
  },
  {
    id: 102,
    name: 'Shiva',
    part: 3,
    status: 'WATCHING',
  },
  {
    id: 103,
    name: 'Vishnu',
    part: 4,
    status: 'COMING SOON',
  },
  {
    id: 104,
    name: 'Action Hero',
    part: 5,
    status: 'PLAN TO WATCH',
  },
  {
    id: 105,
    name: 'Super Hero',
    part: 6,
    status: 'COMING SOON',
  },
  {
    id: 106,
    name: 'Super Man',
    part: 7,
    status: 'COMING SOON',
  },
  {
    id: 107,
    name: 'Super Woman',
    part: 8,
    status: 'PLAN TO WATCH',
  },
  {
    id: 108,
    name: 'Super Girl',
    part: 9,
    status: 'COMING SOON',
  },
  {
    id: 109,
    name: 'Super Boy',
    part: 10,
    status: 'WATCHING',
  },
  {
    id: 110,
    name: 'Super Woman shadow',
    part: 11,
    status: 'WATCHED',
  },
];

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

export default function RoundedCornersTableDemo() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductType>({
    name: '',
    part: 0,
    status: '',
  });

  const handleEditClick = (product: SelectedProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
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
            {products.map((product) => (
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
                      <DropdownMenuItem className=" text-destructive">
                        <Trash2 size={16} /> <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Dialog is rendered outside dropdown menu */}
      <MovieDialog
        mode="edit"
        trigger={<p className="hidden">hidden</p>}
        open={open}
        setOpen={setOpen}
        defaultValues={{
          movie: selectedProduct.name,
          part: selectedProduct.part,
          status: selectedProduct.status,
        }}
        onSubmit={(data, { reset }) => {}}
      />
    </div>
  );
}
