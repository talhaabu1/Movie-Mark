import { auth } from '@/auth';
import Logout from '@/components/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const Page = async () => {
  const session = await auth();
  console.log(session?.user?.image);
  return (
    <section className="text-muted-foreground ">
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
        <h1>{session?.user?.name}</h1>
        <h1>{session?.user?.email}</h1>
        <Logout />
      </div>
    </section>
  );
};

export default Page;
