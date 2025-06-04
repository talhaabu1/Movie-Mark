'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { LogOut, Moon, Sun } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

const Logout = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) return null;

  return (
    <div className="max-w-xs w-full flex gap-x-3.5 ">
      <Button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="w-full"
        size="icon"
        variant="outline">
        {isDark ? <Sun /> : <Moon />}
      </Button>
      <Button
        onClick={() => signOut()}
        className="w-full"
        size="icon"
        variant="outline">
        <LogOut />
      </Button>
    </div>
  );
};

export default Logout;
