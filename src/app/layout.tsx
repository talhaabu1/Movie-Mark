import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ViewTransitions } from 'next-view-transitions';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Movie Mark',
  description: 'Movie Mark is a movie and series mark web-app',
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <ViewTransitions>
      <html lang="en" className={GeistMono.className} suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
};

export default Layout;
