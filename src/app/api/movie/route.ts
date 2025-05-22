import { db } from '@/db';
import { movieTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const movies = await db.query.movieTable.findMany({
      orderBy: (movie, { desc }) => [desc(movie.createdAt)],
      limit: 10,
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to fetch movies!',
        status: 'error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await db.insert(movieTable).values(body);
    return NextResponse.json({
      status: 'success',
      message: 'Movie added successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to added movie',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
