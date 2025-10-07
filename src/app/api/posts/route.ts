import { NextRequest, NextResponse } from 'next/server';
import { db, nextId } from '../mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = (searchParams.get('keyword') || '').toLowerCase();
  const author = (searchParams.get('author') || '').toLowerCase();
  const publishedParam = searchParams.get('published');

  let posts = [...db.posts];
  if (keyword) {
    posts = posts.filter((p) =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.content.toLowerCase().includes(keyword) ||
      p.author.toLowerCase().includes(keyword)
    );
  }
  if (author) {
    posts = posts.filter((p) => p.author.toLowerCase().includes(author));
  }
  if (publishedParam !== null) {
    const published = publishedParam === 'true';
    posts = posts.filter((p) => p.published === published);
  }
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newPost = {
    ...data,
    id: nextId('post'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}


