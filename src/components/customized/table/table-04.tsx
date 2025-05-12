import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Delete, Edit, EllipsisIcon, Trash, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
];

export default function RoundedCornersTableDemo() {
  return (
    <div className=" mx-1">
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
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.part}</TableCell>
                <TableCell>{product.status}</TableCell>
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
                      <DropdownMenuItem>
                        <Edit size={16} /> <span>Edit</span>
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
    </div>
  );
}
