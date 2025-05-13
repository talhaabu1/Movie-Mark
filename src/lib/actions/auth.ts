'use server';

import { signIn } from '@/auth';

const signInWithGoogle = async () => {
  await signIn('google', {
    redirectTo: '/movie',
  });
};

export { signInWithGoogle };
