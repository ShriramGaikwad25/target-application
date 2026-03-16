import { NextResponse } from 'next/server';

const UPDATE_BASE_URL = 'https://preview.keyforge.ai/gbma/account/update';

export async function PUT(
  request: Request,
  context: { params: { userId: string } },
) {
  const { userId } = context.params;

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

    const res = await fetch(`${UPDATE_BASE_URL}/${encodeURIComponent(userId)}`, {
      method: 'PUT',
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
      { error: error?.message ?? 'Failed to update account' },
      { status: 500 },
    );
  }
}

