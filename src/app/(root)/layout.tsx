import BottomNavigation from '@/components/bottom-navigation';
import { type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
};

export default Layout;
