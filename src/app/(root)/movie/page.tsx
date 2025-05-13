'use client';

import Component1 from '@/components/comp-220';
import Pagination1 from '@/components/comp-456';
import RoundedCornersTableDemo from '@/components/customized/table/table-04';
import { Separator } from '@/components/indie/separator';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const Page = () => {
  const [search, setSearch] = useState('');

  console.log(search, ':Search');
  return (
    <div>
      <section className=" flex items-center gap-x-2 mt-3 mx-2 md:mx-0">
        <Search onSelect={setSearch} />
        <Component1 />
        <Button variant="outline" className="aspect-square max-sm:p-0">
          <PlusIcon
            className="opacity-60 sm:-ms-1"
            size={16}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">Add new</span>
        </Button>
      </section>
      <Separator gradient className="my-3" />
      <RoundedCornersTableDemo />
      <Separator gradient className="my-3" />
      <div className="mx-1">
        <Pagination1 currentPage={3} totalPages={10} />
      </div>
    </div>
  );
};

export default Page;
