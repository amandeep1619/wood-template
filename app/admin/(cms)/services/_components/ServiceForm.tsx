"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
const textarea = `${input} resize-y`;
const select = `${input} bg-white`;

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ServiceForm({ serviceId }: { serviceId?: string }) {
  const router = useRouter();
  const isEdit = !!serviceId;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const [form, setForm] = useState({
    title: "", slug: "", shortDescription: "", description: "",
    icon: "", image: "", featured: false, status: "active",
  });

  useEffect(() => {
    if (!serviceId) return;
    fetch(`/api/admin/services/${serviceId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.data) return;
        const s = d.data;
        setForm({
          title: String(s.title ?? ""),
          slug: String(s.slug ?? ""),
          shortDescription: String(s.shortDescription ?? ""),
          description: String(s.description ?? ""),
          icon: String(s.icon ?? ""),
          image: String(s.image ?? ""),
          featured: Boolean(s.featured),
          status: String(s.status ?? "active"),
        });
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  const set = (field: string, value: unknown) => setForm((f) => ({ ...f, [field]: value }));

  const handleTitleChange = (v: string) => {
    set("title", v);
    if (!slugLocked) set("slug", slugify(v));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/services/${serviceId}` : "/api/admin/services";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-sm text-gray-400">Loading…</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/services" className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">{isEdit ? "Edit Service" : "New Service"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Basic Info</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
            <input required type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={input} placeholder="Custom Kitchen Cabinetry" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug <span className="text-red-500">*</span>
              <button type="button" onClick={() => setSlugLocked((l) => !l)} className="ml-2 text-xs text-amber-600 hover:underline">{slugLocked ? "(unlock)" : "(auto)"}</button>
            </label>
            <input required type="text" value={form.slug} onChange={(e) => { setSlugLocked(true); set("slug", e.target.value); }} className={input} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon <span className="text-gray-400 font-normal">(emoji)</span></label>
            <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)} className={input} placeholder="🍳" maxLength={4} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={select}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Content</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description <span className="text-gray-400 font-normal">(listing)</span></label>
            <textarea value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className={textarea} rows={2} placeholder="One sentence shown in cards and listings…" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description <span className="text-gray-400 font-normal">(detail page)</span></label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className={textarea} rows={5} placeholder="Detailed description of the service…" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Media</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
            <input type="url" value={form.image} onChange={(e) => set("image", e.target.value)} className={input} placeholder="https://images.unsplash.com/…" />
            {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-full object-cover rounded-lg" />}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Featured service</p>
              <p className="text-xs text-gray-400">Highlight this service on the homepage</p>
            </div>
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-1">
          <Link href="/admin/services" className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</Link>
          <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-60 rounded-lg transition-colors">
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
          </button>
        </div>
      </form>
    </div>
  );
}
