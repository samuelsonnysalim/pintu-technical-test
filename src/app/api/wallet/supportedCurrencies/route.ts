import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.pintu.co.id/v2/wallet/supportedCurrencies',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();

  return NextResponse.json(data);
}
