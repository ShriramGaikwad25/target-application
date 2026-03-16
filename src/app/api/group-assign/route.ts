import { NextResponse } from 'next/server';

const ASSIGN_URL = 'https://preview.keyforge.ai/gbma/group/assign';

export async function POST(request: Request) {
  try {
    const incoming = await request.json();
    const body = {
      userId: incoming.userId ?? '',
      groupName: incoming.groupName ?? '',
    };

    const res = await fetch(ASSIGN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status} ${res.statusText}`, data },
        { status: res.status },
      );
    }

    return NextResponse.json(data ?? { success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to assign group' },
      { status: 500 },
    );
  }
}

