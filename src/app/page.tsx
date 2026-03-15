"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Replace with your auth logic
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left panel - blue */}
      <div
        className="hidden w-1/3 min-w-[280px] lg:block"
        style={{ backgroundColor: "#0040FF" }}
      ></div>

      {/* Right panel - white with form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Key icon */}
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, #86efac 0%, #22d3ee 50%, #0d9488 100%)",
            }}
          >
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>

          <h1 className="text-center text-2xl font-bold text-black">Log In</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-normal text-black"
              >
                User ID*
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                autoComplete="username"
                placeholder="Insert your User ID"
                className="mt-1.5 w-full rounded border border-gray-300 bg-white px-3.5 py-2.5 text-black placeholder-gray-400 placeholder:italic outline-none transition focus:border-[#0040FF] focus:ring-1 focus:ring-[#0040FF]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-normal text-black"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Insert your password"
                className="mt-1.5 w-full rounded border border-gray-300 bg-white px-3.5 py-2.5 text-black placeholder-gray-400 placeholder:italic outline-none transition focus:border-[#0040FF] focus:ring-1 focus:ring-[#0040FF]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded py-2.5 text-sm font-bold text-white transition disabled:opacity-50"
              style={{ backgroundColor: "#0040FF" }}
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-black">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-normal text-[#0040FF] underline"
            >
              Register with SSO
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
