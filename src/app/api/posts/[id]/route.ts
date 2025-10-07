import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../mockData';

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const post = db.posts.find((p) => p.id === Number(id));
  if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idx = db.posts.findIndex((p) => p.id === Number(id));
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const data = await req.json();
  db.posts[idx] = { ...db.posts[idx], ...data, updatedAt: new Date().toISOString() };
  return NextResponse.json(db.posts[idx]);
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idx = db.posts.findIndex((p) => p.id === Number(id));
  if (idx === -1) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  db.posts.splice(idx, 1);
  return NextResponse.json({});
}


