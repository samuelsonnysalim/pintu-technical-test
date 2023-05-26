export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (url) {
    const res = await fetch(url, {
      cache: 'force-cache',
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });

    return new Response(await res.text(), {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=604800',
      },
    });
  }
}
