import { db } from '@/db';
import { seriesTable } from '@/db/schema';
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
          error: 'Invalid series ID',
          status: 'error',
        },
        { status: 400 }
      );
    }

    await db.delete(seriesTable).where(eq(seriesTable.id, id));
    return NextResponse.json({
      status: 'success',
      message: 'Series deleted successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to delete series',
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
          error: 'Invalid series ID',
          status: 'error',
        },
        { status: 400 }
      );
    }

    await db.update(seriesTable).set(body).where(eq(seriesTable.id, id));
    return NextResponse.json({
      status: 'success',
      message: 'Series updated successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to update series',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
