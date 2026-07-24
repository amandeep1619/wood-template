"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  perPage: number;
  onChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  const pages: (number | "…")[] = [1];
  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function Pagination({ total, page, perPage, onChange, onPerPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50/50">
      {/* Count */}
      <p className="text-xs text-gray-500 order-2 sm:order-1">
        Showing{" "}
        <span className="font-medium text-gray-700">{from}</span>
        {" – "}
        <span className="font-medium text-gray-700">{to}</span>
        {" of "}
        <span className="font-medium text-gray-700">{total}</span>{" "}
        results
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        {pageNumbers(page, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-[28px] h-7 rounded text-xs font-medium transition-colors ${
                p === page
                  ? "bg-amber-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Per-page */}
      <select
        value={perPage}
        onChange={(e) => { onPerPageChange(Number(e.target.value)); onChange(1); }}
        className="text-xs text-gray-600 border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-amber-500 order-3"
      >
        {[5, 10, 25, 50].map((n) => (
          <option key={n} value={n}>{n} per page</option>
        ))}
      </select>
    </div>
  );
}
