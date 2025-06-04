import { Separator } from '@/components/indie/separator';
import Logout from '@/components/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { auth } from '@/auth';

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
        <h1>Movie</h1>
        <ScrollArea className="w-full pb-4 mt-1">
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Card className="min-w-[200px]" key={i}>
                <CardContent className=" flex flex-col items-center gap-y-1.5 text-blue-500">
                  <span>10</span>
                  <p>ALL</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default Page;
