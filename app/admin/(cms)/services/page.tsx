"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Pagination from "@/components/admin/Pagination";

type Item = Record<string, unknown>;

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    inactive: "bg-gray-100 text-gray-600 ring-gray-600/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status] ?? map.inactive}`}>
      {status}
    </span>
  );
}

const PER_PAGE_DEFAULT = 10;

export default function ServicesListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_DEFAULT);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    const res = await fetch(`/api/admin/services?${params}`).then((r) => r.json());
    setItems(res.data ?? []);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Reset to page 1 whenever search changes
  useEffect(() => { setPage(1); }, [search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchData();
  };

  const pagedItems = items.slice((page - 1) * perPage, page * perPage);
  const colSpan = 5;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.length} total</p>
        </div>
        <Link href="/admin/services/new" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Service
        </Link>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search services…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Service</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Slug</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Featured</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={colSpan} className="text-center py-12 text-gray-400">Loading…</td></tr>
              ) : pagedItems.length === 0 ? (
                <tr><td colSpan={colSpan} className="text-center py-12 text-gray-400">No services found</td></tr>
              ) : (
                pagedItems.map((item) => (
                  <tr key={String(item.id)} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{String(item.icon ?? "")}</span>
                        <div>
                          <p className="font-medium text-gray-900">{String(item.title)}</p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">{String(item.shortDescription)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden sm:table-cell">{String(item.slug)}</td>
                    <td className="px-4 py-3"><StatusBadge status={String(item.status)} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.featured ? <span className="text-amber-500">★</span> : <span className="text-gray-300">★</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/services/${item.id}/edit`} className="text-sm text-amber-600 hover:text-amber-700 font-medium">Edit</Link>
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

        {!loading && items.length > 0 && (
          <Pagination
            total={items.length}
            page={page}
            perPage={perPage}
            onChange={setPage}
            onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
          />
        )}
      </div>
    </div>
  );
}
