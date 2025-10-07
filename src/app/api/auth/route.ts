import { NextRequest, NextResponse } from 'next/server';
import { db } from '../mockData';
import { decrypt, encrypt } from '@/services/encryption';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if(username !== db.admin.username) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  if(password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ 
    user: db.admin, 
    token: encrypt({
      id: db.admin.id,
      date: new Date().toISOString(),
    }) 
  });
}

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  
  if(!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  const decryptedToken = decrypt<{ id: number; }>(token);
  
  if(decryptedToken.id !== db.admin.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(db.admin);
}
