import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const res = await fetch(
    `https://content.pintu.co.id/market-tags?${searchParams.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();

  return NextResponse.json(data);
}
