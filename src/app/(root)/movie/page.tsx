import Component1 from '@/components/comp-220';
import Component from '@/components/comp-229';
import RoundedCornersTableDemo from '@/components/customized/table/table-04';
import { Separator } from '@/components/indie/separator';
import { Button } from '@/components/ui/button';
import { CreativeCommons, PlusIcon } from 'lucide-react';

const Page = () => {
  return (
    <div>
      <section className=" flex items-center gap-x-2 mt-3 mx-2 md:mx-0">
        <Component />
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
    </div>
  );
};

export default Page;
