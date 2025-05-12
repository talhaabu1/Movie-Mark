import BottomNavigation from '@/components/bottom-navigation';
import { type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default Layout;
