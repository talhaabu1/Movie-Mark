import { Separator } from '@/components/indie/separator';
import Logout from '@/components/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { auth } from '@/auth';
import StatusReport from '@/components/status-report';

const Page = async () => {
  const session = await auth();

  return (
    <section>
      <div className=" flex flex-col items-center justify-center mt-10 gap-y-1.5">
        <Avatar className="rounded-md">
          <AvatarImage
            src={session?.user?.image || ''}
            alt={session?.user?.name || 'User'}
          />
          <AvatarFallback>
            {session?.user?.name
              ?.split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase() || 'MM'}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-muted-foreground ">{session?.user?.name}</h1>
        <h1 className="text-muted-foreground ">{session?.user?.email}</h1>
        <Logout />
      </div>
      <div className="max-w-2xl mx-2 md:mx-auto">
        <Separator gradient className="my-3" />
        <StatusReport />
      </div>
    </section>
  );
};

export default Page;
