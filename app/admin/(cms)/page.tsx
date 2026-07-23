"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  projects: number;
  services: number;
  blogs: number;
}

function StatCard({ label, value, href, icon, color }: {
  label: string; value: number; href: string; icon: React.ReactNode; color: string;
}) {
  return (
    <Link href={href} className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
        <svg className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, services: 0, blogs: 0 });
  const [recentProjects, setRecentProjects] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/services").then((r) => r.json()),
      fetch("/api/admin/blogs").then((r) => r.json()),
    ]).then(([projects, services, blogs]) => {
      setStats({
        projects: projects.total ?? 0,
        services: services.total ?? 0,
        blogs: blogs.total ?? 0,
      });
      setRecentProjects((projects.data ?? []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s an overview of your content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Projects"
          value={stats.projects}
          href="/admin/projects"
          color="bg-blue-50 text-blue-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          }
        />
        <StatCard
          label="Total Services"
          value={stats.services}
          href="/admin/services"
          color="bg-emerald-50 text-emerald-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          }
        />
        <StatCard
          label="Blog Posts"
          value={stats.blogs}
          href="/admin/blogs"
          color="bg-violet-50 text-violet-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
      </div>

      {/* Recent projects */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Projects</h2>
          <Link href="/admin/projects" className="text-xs text-amber-600 hover:text-amber-700 font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32 text-sm text-gray-400">Loading…</div>
        ) : recentProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-sm text-gray-400">
            <p>No projects yet</p>
            <Link href="/admin/projects/new" className="mt-2 text-amber-600 hover:underline">Add your first project</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentProjects.map((project) => (
              <div key={String(project.id)} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{String(project.title)}</p>
                  <p className="text-xs text-gray-400">{String(project.location)} · {String(project.year)}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <StatusBadge status={String(project.status)} />
                  <Link href={`/admin/projects/${project.id}/edit`} className="text-xs text-gray-400 hover:text-amber-600">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/admin/projects/new", label: "New Project" },
          { href: "/admin/services/new", label: "New Service" },
          { href: "/admin/blogs/new", label: "New Blog Post" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-2 justify-center border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-400 hover:border-amber-300 hover:text-amber-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    draft: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    archived: "bg-gray-100 text-gray-600 ring-gray-600/20",
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    inactive: "bg-gray-100 text-gray-600 ring-gray-600/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status] ?? map.draft}`}>
      {status}
    </span>
  );
}
