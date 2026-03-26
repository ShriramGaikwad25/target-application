"use client";

import { useEffect } from "react";
import { Chart, DoughnutController, ArcElement, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";

Chart.register(
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
);

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const revenueCanvas = document.getElementById("revenueChart") as HTMLCanvasElement | null;
    const userCanvas = document.getElementById("userChart") as HTMLCanvasElement | null;
    if (!revenueCanvas || !userCanvas) return;

    const revenueChart = new Chart(revenueCanvas.getContext("2d")!, {
      type: "line",
      data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "MRR",
            data: [31000, 35500, 38000, 41200, 44800, 48200],
            borderColor: "#2f6de0",
            backgroundColor: "rgba(47,109,224,0.08)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });

    const userChart = new Chart(userCanvas.getContext("2d")!, {
      type: "doughnut",
      data: {
        labels: ["Pro", "Starter", "Enterprise", "Free"],
        datasets: [
          {
            data: [38, 27, 20, 15],
            backgroundColor: ["#2f6de0", "#7c5cbf", "#0fa874", "#e07c2f"],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: { legend: { position: "bottom" } },
      },
    });

    return () => {
      revenueChart.destroy();
      userChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-7">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold italic tracking-tight text-stone-900">
            Good morning, Jane
          </h1>
          <p className="mt-1 text-sm text-stone-500">Thursday, March 26, 2026</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50">
            Export
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            New Report
          </button>
        </div>
      </div>

      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-500">Overview</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Users", "14,280", "+12.4% vs last month", true],
            ["MRR", "$48.2K", "+8.1% vs last month", true],
            ["Active Sessions", "3,941", "+5.7% today", true],
            ["Churn Rate", "2.3%", "+0.4% vs last month", false],
          ].map(([label, value, change, up]) => (
            <article key={String(label)} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">{label}</p>
              <p className="mt-3 text-4xl italic tracking-tight text-stone-900">{value}</p>
              <p className={`mt-2 text-xs font-semibold ${up ? "text-emerald-600" : "text-rose-600"}`}>{change}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-500">Quick Actions</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            className="rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            onClick={() => router.push("/dashboard/admin")}
          >
            <p className="text-sm font-semibold text-stone-900">Invite User</p>
            <p className="mt-1 text-xs text-stone-500">Add a team member</p>
          </button>
          <button type="button" className="rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-semibold text-stone-900">Run Report</p>
            <p className="mt-1 text-xs text-stone-500">Generate analytics</p>
          </button>
          <button type="button" className="rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-semibold text-stone-900">New Integration</p>
            <p className="mt-1 text-xs text-stone-500">Connect a data source</p>
          </button>
          <button type="button" className="rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-semibold text-stone-900">Settings</p>
            <p className="mt-1 text-xs text-stone-500">Configure workspace</p>
          </button>
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-500">Analytics</p>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.7fr_1fr]">
          <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900">Revenue Overview</h2>
              <span className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs text-stone-500">
                Last 6 months
              </span>
            </div>
            <div className="h-56">
              <canvas id="revenueChart" />
            </div>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900">User Breakdown</h2>
              <span className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs text-stone-500">
                This month
              </span>
            </div>
            <div className="h-56">
              <canvas id="userChart" />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
