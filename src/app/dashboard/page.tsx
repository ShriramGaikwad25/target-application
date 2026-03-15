'use client';

interface DashboardPageProps {
  userName?: string;
}

export default function DashboardPage({ userName }: DashboardPageProps) {
  const name = userName ?? 'User';

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Welcome back, <strong>{name}</strong>. Here you can manage employees,
          leave requests, and company resources.
        </p>
      </div>
    </div>
  );
}
