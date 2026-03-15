"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open = true }: SidebarProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
   const isAdmin = pathname === "/dashboard/admin";

  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-gray-100 py-4 transition-[width] duration-200 ${
        open ? "w-56" : "w-16"
      }`}
    >
      <nav className="flex flex-1 flex-col gap-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isDashboard
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          aria-label="Dashboard"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 11L12 3l9 8" />
              <path d="M5 10v10h5v-5h4v5h5V10" />
            </svg>
          </span>
          {open && <span>Dashboard</span>}
        </Link>
        <Link
          href="/dashboard/admin"
          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isAdmin ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"
          }`}
          aria-label="Admin"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="7" r="3" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              <path d="M18 11.5V9a2 2 0 0 0-2-2h-1" />
            </svg>
          </span>
          {open && <span>Admin</span>}
        </Link>
      </nav>
    </aside>
  );
}
