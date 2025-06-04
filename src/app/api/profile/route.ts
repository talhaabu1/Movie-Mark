import { auth } from '@/auth';
import { db } from '@/db';
import { movieTable } from '@/db/schema';
import { and, count, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  const userId = Number(session?.user?.id);

  const [total, watched, watching, planToWatch, comingSoon] = await Promise.all(
    [
      // 🎬 Total movies added by user
      db
        .select({ count: count() })
        .from(movieTable)
        .where(eq(movieTable.userId, userId)),

      // ✅ Movies marked as 'WATCHED'
      db
        .select({ count: count() })
        .from(movieTable)
        .where(
          and(eq(movieTable.userId, userId), eq(movieTable.status, 'WATCHED'))
        ),

      // 📺 Movies currently 'WATCHING'
      db
        .select({ count: count() })
        .from(movieTable)
        .where(
          and(eq(movieTable.userId, userId), eq(movieTable.status, 'WATCHING'))
        ),

      // 📅 Movies planned to watch
      db
        .select({ count: count() })
        .from(movieTable)
        .where(
          and(
            eq(movieTable.userId, userId),
            eq(movieTable.status, 'PLAN TO WATCH')
          )
        ),

      // 🚀 Upcoming movies marked as 'COMING SOON'
      db
        .select({ count: count() })
        .from(movieTable)
        .where(
          and(
            eq(movieTable.userId, userId),
            eq(movieTable.status, 'COMING SOON')
          )
        ),
    ]
  );

  // 📦 Return the aggregated counts as JSON response
  return NextResponse.json({
    total: total[0]?.count ?? 0,
    watched: watched[0]?.count ?? 0,
    watching: watching[0]?.count ?? 0,
    planToWatch: planToWatch[0]?.count ?? 0,
    comingSoon: comingSoon[0]?.count ?? 0,
  });
}
