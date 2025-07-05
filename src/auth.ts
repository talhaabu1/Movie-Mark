import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { usersTable } from './db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 3,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email!))
          .limit(1)
          .then((res) => res[0]);

        if (!existingUser) {
          const insertedUser = await db
            .insert(usersTable)
            .values({
              name: user.name!,
              email: user.email!,
              image: user.image!,
            })
            .returning({ id: usersTable.id })
            .then((res) => res[0]);

          user.id = String(insertedUser.id);
        } else {
          user.id = String(existingUser.id);
        }

        return true;
      } catch (error) {
        console.error('Sign-in DB error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});
