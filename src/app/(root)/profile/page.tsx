import { auth } from '@/auth';
import React from 'react';

const Page = async () => {
  const session = await auth();

  return <div>{session?.user?.name}</div>;
};

export default Page;
