'use client';

import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const Logout = () => {
  return (
    <Button onClick={() => signOut()} variant="outline">
      <LogOut />
    </Button>
  );
};

export default Logout;
