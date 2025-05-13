import { auth } from '@/auth';
import Login from '@/components/login';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login - Movie Mark',
  description: 'Login to access your account',
};

const Page = async () => {
  const session = await auth();

  if (session) return redirect('/movie');
  return (
    <section className="w-full h-dvh flex flex-col items-center justify-center">
      <Login />
    </section>
  );
};

export default Page;
