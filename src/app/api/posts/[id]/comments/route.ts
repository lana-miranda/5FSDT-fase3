import { NextRequest, NextResponse } from 'next/server';
import { db, nextId } from '../../../mockData';

export async function GET(_req: NextRequest, context: { params: Promise<{ id: number }> }) {
  const { id: postId } = await context.params;
  const comments = db.comments.filter((c) => c.postId === Number(postId));
  return NextResponse.json(comments || []);
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: number; }> }) {
  const { id: postId } = await context.params;

  const { author, content } = await req.json();

  if(!author) return NextResponse.json({ message: 'Author is required' }, { status: 400 });
  if(!content) return NextResponse.json({ message: 'Content is required' }, { status: 400 });

  const comment = {
    id: nextId('comment'),
    postId: Number(postId),
    author,
    content,
    createdAt: new Date().toISOString(),
  };

  db.comments.push(comment);

  return NextResponse.json(comment, { status: 201 });
}


