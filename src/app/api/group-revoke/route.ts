import { NextResponse } from 'next/server';

const REVOKE_URL = 'https://preview.keyforge.ai/gbma/group/revoke';

export async function POST(request: Request) {
  try {
    const incoming = await request.json();
    const body = {
      userId: incoming.userId ?? '',
      groupName: incoming.groupName ?? '',
    };

    const res = await fetch(REVOKE_URL, {
      // External API expects a revoke operation; use DELETE downstream
      method: 'DELETE',
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
      { error: error?.message ?? 'Failed to revoke group' },
      { status: 500 },
    );
  }
}

