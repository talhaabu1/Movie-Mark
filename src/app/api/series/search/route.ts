import { db } from '@/db';
import { seriesTable } from '@/db/schema';
import { isValidStatus } from '@/types/enum';
import { and, eq, ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchParam = searchParams.get('search')?.trim();
    const userIdParam = searchParams.get('userId');
    const statusParam = searchParams.get('status');

    const where = [];

    if (searchParam) {
      where.push(ilike(seriesTable.name, `%${searchParam}%`));
    }

    if (userIdParam) {
      where.push(eq(seriesTable.userId, Number(userIdParam)));
    }

    if (statusParam && isValidStatus(statusParam)) {
      where.push(eq(seriesTable.status, statusParam));
    }

    const filter = where.length ? and(...where) : undefined;

    const seriesName = await db.query.seriesTable.findMany({
      where: filter,
      orderBy: (series, { asc }) => [asc(series.createdAt)],
      columns: {
        id: true,
        name: true,
      },
      limit: 5,
    });

    return NextResponse.json(seriesName);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to get series name',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
