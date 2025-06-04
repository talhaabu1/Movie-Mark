import BottomNavigation from '@/components/bottom-navigation';
import { type ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto mb-[75px]">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default Layout;
