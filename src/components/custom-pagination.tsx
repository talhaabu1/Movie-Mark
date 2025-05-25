import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className={cn(
              'aria-disabled:pointer-events-none aria-disabled:opacity-50',
              buttonVariants({ variant: 'outline' })
            )}>
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>

        <PaginationItem>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Page <span className="text-foreground">{currentPage}</span> of{' '}
            <span className="text-foreground">{totalPages}</span>
          </p>
        </PaginationItem>

        <PaginationItem>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className={cn(
              'aria-disabled:pointer-events-none aria-disabled:opacity-50',
              buttonVariants({ variant: 'outline' })
            )}>
            <ChevronRightIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
