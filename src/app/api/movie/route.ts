import { db } from '@/db';
import { movieTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await db.insert(movieTable).values(body);
    return NextResponse.json({ status: 'success', message: 'Movie created' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to create movie',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
