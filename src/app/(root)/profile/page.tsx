import { auth } from '@/auth';
import Logout from '@/components/logout';
import React from 'react';

const Page = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="text-muted-foreground">
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.id}</h1>
      <Logout />
    </div>
  );
};

export default Page;
