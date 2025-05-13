import { auth } from '@/auth';
import Logout from '@/components/logout';
import React from 'react';

const Page = async () => {
  const session = await auth();

  return (
    <div className="text-muted-foreground">
      <h1>{session?.user?.name}</h1>
      <Logout />
    </div>
  );
};

export default Page;
