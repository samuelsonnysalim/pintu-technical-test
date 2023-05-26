import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://content.pintu.co.id/market-tags?language.name=ID&_sort=order:ASC',
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();

  return NextResponse.json(data);
}
