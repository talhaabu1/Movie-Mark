import { auth } from '@/auth';
import { db } from '@/db';
import { movieTable, seriesTable } from '@/db/schema';
import { isValidStatus } from '@/types/enum';
import { and, count, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

type TableType = typeof movieTable | typeof seriesTable;

async function getCountByStatus(
  table: TableType,
  userId: number,
  status?: string
) {
  const conditions = [eq(table.userId, userId)];

  if (status && isValidStatus(status)) {
    conditions.push(eq(table.status, status));
  }

  return db
    .select({ count: count() })
    .from(table)
    .where(and(...conditions));
}

// 📦 API handler
export async function GET() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 🎬 Movie Stats
  const [
    totalMovies,
    watchedMovies,
    watchingMovies,
    planToWatchMovies,
    comingSoonMovies,
  ] = await Promise.all([
    getCountByStatus(movieTable, userId),
    getCountByStatus(movieTable, userId, 'WATCHED'),
    getCountByStatus(movieTable, userId, 'WATCHING'),
    getCountByStatus(movieTable, userId, 'PLAN TO WATCH'),
    getCountByStatus(movieTable, userId, 'COMING SOON'),
  ]);

  // 📺 Series Stats
  const [
    totalSeries,
    watchedSeries,
    watchingSeries,
    planToWatchSeries,
    comingSoonSeries,
  ] = await Promise.all([
    getCountByStatus(seriesTable, userId),
    getCountByStatus(seriesTable, userId, 'WATCHED'),
    getCountByStatus(seriesTable, userId, 'WATCHING'),
    getCountByStatus(seriesTable, userId, 'PLAN TO WATCH'),
    getCountByStatus(seriesTable, userId, 'COMING SOON'),
  ]);

  // 📊 Build Response
  return NextResponse.json({
    movie: [
      { total: totalMovies[0]?.count ?? 0, name: 'ALL' },
      { total: watchedMovies[0]?.count ?? 0, name: 'WATCHED' },
      { total: watchingMovies[0]?.count ?? 0, name: 'WATCHING' },
      { total: planToWatchMovies[0]?.count ?? 0, name: 'PLAN TO WATCH' },
      { total: comingSoonMovies[0]?.count ?? 0, name: 'COMING SOON' },
    ],
    series: [
      { total: totalSeries[0]?.count ?? 0, name: 'ALL' },
      { total: watchedSeries[0]?.count ?? 0, name: 'WATCHED' },
      { total: watchingSeries[0]?.count ?? 0, name: 'WATCHING' },
      { total: planToWatchSeries[0]?.count ?? 0, name: 'PLAN TO WATCH' },
      { total: comingSoonSeries[0]?.count ?? 0, name: 'COMING SOON' },
    ],
  });
}
