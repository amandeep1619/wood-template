"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Item = Record<string, unknown>;

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    draft: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    archived: "bg-gray-100 text-gray-600 ring-gray-600/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status] ?? map.draft}`}>
      {status}
    </span>
  );
}

export default function ProjectsListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (statusFilter) params.set("status", statusFilter);
    if (catFilter) params.set("categoryId", catFilter);
    const [projectsRes, catsRes] = await Promise.all([
      fetch(`/api/admin/projects?${params}`).then((r) => r.json()),
      fetch("/api/admin/categories/projects").then((r) => r.json()),
    ]);
    setItems(projectsRes.data ?? []);
    setCategories(catsRes.data ?? []);
    setLoading(false);
  }, [search, statusFilter, catFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchData();
  };

  const getCatName = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? String(cat.name) : id;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.length} total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:border-amber-500 focus:outline-none"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:border-amber-500 focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={String(c.id)} value={String(c.id)}>{String(c.name)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Year</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Featured</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">Loading…</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No projects found</td></tr>
              ) : (
                items.map((item) => (
                  <tr key={String(item.id)} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900">{String(item.title)}</p>
                      <p className="text-xs text-gray-400 truncate max-w-xs hidden sm:block">{String(item.shortDescription)}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{getCatName(String(item.categoryId))}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{String(item.year)}</td>
                    <td className="px-4 py-3"><StatusBadge status={String(item.status)} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.featured ? (
                        <span className="text-amber-500">★</span>
                      ) : (
                        <span className="text-gray-300">★</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/projects/${item.id}/edit`} className="text-sm text-amber-600 hover:text-amber-700 font-medium">Edit</Link>
                        <button
                          onClick={() => handleDelete(String(item.id), String(item.title))}
                          disabled={deleting === String(item.id)}
                          className="text-sm text-red-500 hover:text-red-600 font-medium disabled:opacity-40"
                        >
                          {deleting === String(item.id) ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
