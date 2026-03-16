'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface AccountFormState {
  userId?: string;
  accountName: string;
  lastName: string;
  firstName: string;
  department: string;
  clientName: string;
  planName: string;
  roleName: string;
}

export default function AdminCreatePage() {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get('mode') === 'edit' ? 'edit' : 'create';

  const [form, setForm] = useState<AccountFormState>(() => ({
    userId: search.get('userId') ?? undefined,
    accountName: search.get('accountName') ?? '',
    lastName: search.get('lastName') ?? '',
    firstName: search.get('firstName') ?? '',
    department: search.get('department') ?? '',
    clientName: search.get('clientName') ?? '',
    planName: search.get('planName') ?? '',
    roleName: search.get('roleName') ?? '',
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange<K extends keyof AccountFormState>(
    key: K,
    value: AccountFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const url =
        mode === 'edit' && form.userId
          ? `/api/accounts/${encodeURIComponent(form.userId)}`
          : '/api/accounts';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed with status ${res.status}`);
      }

      router.push('/dashboard/admin');
    } catch (err: any) {
      setError(
        err?.message ??
          (mode === 'edit'
            ? 'Failed to update account'
            : 'Failed to create account'),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">
        {mode === 'edit' ? 'Edit Account' : 'Create Account'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.accountName}
              onChange={(e) => handleChange('accountName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plan Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.planName}
              onChange={(e) => handleChange('planName', e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={form.roleName}
              onChange={(e) => handleChange('roleName', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting
              ? mode === 'edit'
                ? 'Saving...'
                : 'Creating...'
              : mode === 'edit'
                ? 'Save'
                : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}

