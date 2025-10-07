import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../mockData';

export async function DELETE(_req: NextRequest, context: { params: Promise<{ commentId: string }> }) {
  const { commentId } = await context.params;
  const idx = db.comments.findIndex((c) => c.id === Number(commentId));
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  db.comments.splice(idx, 1);
  return NextResponse.json({});
}


