import { db } from '@/db';
import { movieTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse, type NextRequest } from 'next/server';

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const id = parseInt((await params).id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          error: 'Invalid movie ID',
          status: 'error',
        },
        { status: 400 }
      );
    }

    await db.delete(movieTable).where(eq(movieTable.id, id));
    return NextResponse.json({
      status: 'success',
      message: 'Movie deleted successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to delete movie',
        status: 'error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const id = parseInt((await params).id);
    const body = await req.json();

    if (isNaN(id)) {
      return NextResponse.json(
        {
          error: 'Invalid movie ID',
          status: 'error',
        },
        { status: 400 }
      );
    }

    await db.update(movieTable).set(body).where(eq(movieTable.id, id));
    return NextResponse.json({
      status: 'success',
      message: 'Movie updated successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to update movie',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
