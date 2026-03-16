import { NextResponse } from 'next/server';

const GROUPS_URL = 'https://preview.keyforge.ai/gbma/group/all';

export async function GET() {
  try {
    const res = await fetch(GROUPS_URL, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status} ${res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to fetch groups' },
      { status: 500 },
    );
  }
}

