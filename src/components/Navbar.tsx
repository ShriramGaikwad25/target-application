"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  userName?: string;
}

export default function Navbar({ onMenuClick, userName }: NavbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = userName?.charAt(0).toUpperCase() ?? "U";

  function handleLogout() {
    // Clear auth state here later if needed
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header
      className="relative flex h-14 shrink-0 items-center justify-between px-4 text-white"
      style={{ backgroundColor: "#16a34a" }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="text-lg font-semibold">Target Application</span>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-semibold"
          style={{ color: "#16a34a" }}
          aria-label="Profile menu"
        >
          {initials}
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 rounded-md border border-gray-200 bg-white py-1 text-sm text-gray-700 shadow-lg">
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-3 py-1.5 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
