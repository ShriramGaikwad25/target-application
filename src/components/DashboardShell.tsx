"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navItems = useMemo(
    () => [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/admin", label: "Manage Users" },
      { href: "#", label: "Reports" },
      { href: "#", label: "Integrations" },
      { href: "#", label: "Settings" },
    ],
    [],
  );

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900">
      <aside className="fixed bottom-0 left-0 top-0 flex w-60 flex-col border-r border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              M
            </div>
            <p className="text-xl font-semibold italic">Mosaic</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href !== "#" &&
              (pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href)));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-200 p-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left hover:bg-stone-100"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
                JD
              </div>
              <div>
                <p className="text-sm font-semibold">Jane Doe</p>
                <p className="text-xs text-stone-500">Admin</p>
              </div>
            </button>
            {profileMenuOpen && (
              <div className="absolute bottom-12 left-0 z-20 w-full rounded-lg border border-stone-200 bg-white py-1 shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    router.push("/");
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  );
}
