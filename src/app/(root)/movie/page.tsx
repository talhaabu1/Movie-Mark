'use client';

import Pagination1 from '@/components/comp-454';
import RoundedCornersTableDemo from '@/components/customized/table/table-04';
import { Separator } from '@/components/indie/separator';
import Search from '@/components/search';
import StatusSelect from '@/components/status-select';
import { useState } from 'react';
import MovieDialog from './movie-dialog';

const Page = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  console.log(search);
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
        <MovieDialog />
      </section>
      <Separator gradient className="my-3" />
      <RoundedCornersTableDemo />
      <Separator gradient className="my-3" />
      <div className="mx-1 md:mx-0">
        <Pagination1 currentPage={5} totalPages={10} />
      </div>
    </div>
  );
};

export default Page;
