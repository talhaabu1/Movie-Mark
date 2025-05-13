import { auth } from '@/auth';
import BottomNavigation from '@/components/bottom-navigation';
import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) return redirect('/');

  return (
    <>
      <div className="container mx-auto mb-[75px]">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default Layout;
