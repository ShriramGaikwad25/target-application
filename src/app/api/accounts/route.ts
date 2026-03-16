import { NextResponse } from 'next/server';

const LIST_URL = 'https://preview.keyforge.ai/gbma/account/all';
const CREATE_URL = 'https://preview.keyforge.ai/gbma/account/create';

export async function GET() {
  try {
    const res = await fetch(LIST_URL, {
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
      { error: error?.message ?? 'Failed to fetch accounts' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const incoming = await request.json();
    const body = {
      accountName: incoming.accountName ?? '',
      lastName: incoming.lastName ?? '',
      firstName: incoming.firstName ?? '',
      department: incoming.department ?? '',
      clientName: incoming.clientName ?? '',
      planName: incoming.planName ?? '',
      roleName: incoming.roleName ?? '',
    };

    const res = await fetch(CREATE_URL, {
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
      { error: error?.message ?? 'Failed to create account' },
      { status: 500 },
    );
  }
}

