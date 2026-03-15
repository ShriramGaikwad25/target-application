"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userName = "Harish"; // replace with real auth user later

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar
        onMenuClick={() => setSidebarOpen((o) => !o)}
        userName={userName}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-auto bg-[#e8eef3] p-6">{children}</main>
      </div>
    </div>
  );
}
