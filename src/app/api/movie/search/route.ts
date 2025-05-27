import { db } from '@/db';
import { movieTable } from '@/db/schema';
import { and, eq, ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchParam = searchParams.get('search')?.trim();
    const userIdParam = searchParams.get('userId');

    const where = [];

    if (searchParam) {
      where.push(ilike(movieTable.name, `%${searchParam}%`));
    }

    if (userIdParam) {
      where.push(eq(movieTable.userId, Number(userIdParam)));
    }

    const filter = where.length ? and(...where) : undefined;

    const movieName = await db.query.movieTable.findMany({
      where: filter,
      orderBy: (movie, { asc }) => [asc(movie.createdAt)],
      columns: {
        id: true,
        name: true,
      },
      limit: 5,
    });

    return NextResponse.json(movieName);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to get movie name',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
