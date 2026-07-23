"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Category = { id: string; name: string };

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
const textarea = `${input} resize-y min-h-20`;
const select = `${input} bg-white`;

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface ProjectFormProps {
  projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = !!projectId;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const [form, setForm] = useState({
    title: "", slug: "", shortDescription: "", categoryId: "",
    coverImage: "", gallery: "", location: "", year: new Date().getFullYear(),
    client: "", duration: "", featured: false, status: "draft",
  });

  useEffect(() => {
    fetch("/api/admin/categories/projects")
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []));
  }, []);

  useEffect(() => {
    if (!projectId) return;
    fetch(`/api/admin/projects/${projectId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.data) return;
        const p = d.data;
        setForm({
          title: String(p.title ?? ""),
          slug: String(p.slug ?? ""),
          shortDescription: String(p.shortDescription ?? ""),
          categoryId: String(p.categoryId ?? ""),
          coverImage: String(p.coverImage ?? ""),
          gallery: Array.isArray(p.gallery) ? (p.gallery as string[]).join("\n") : "",
          location: String(p.location ?? ""),
          year: Number(p.year ?? new Date().getFullYear()),
          client: String(p.client ?? ""),
          duration: String(p.duration ?? ""),
          featured: Boolean(p.featured),
          status: String(p.status ?? "draft"),
        });
      })
      .finally(() => setLoading(false));
  }, [projectId]);

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
      const payload = {
        ...form,
        year: Number(form.year),
        gallery: form.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      const url = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Save failed");
      }
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-sm text-gray-400">Loading…</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">{isEdit ? "Edit Project" : "New Project"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Basic Info</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
            <input required type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={input} placeholder="Modern Walnut Kitchen" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug <span className="text-red-500">*</span>
              <button type="button" onClick={() => setSlugLocked((l) => !l)} className="ml-2 text-xs text-amber-600 hover:underline">
                {slugLocked ? "(unlock)" : "(auto)"}
              </button>
            </label>
            <input required type="text" value={form.slug} onChange={(e) => { setSlugLocked(true); set("slug", e.target.value); }} className={input} placeholder="modern-walnut-kitchen" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
            <textarea value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className={textarea} placeholder="One-sentence summary shown in listings…" rows={2} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={select}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={select}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Project Details</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} className={input} placeholder="Portland, OR" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
              <input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} className={input} min={2000} max={2030} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Client</label>
              <input type="text" value={form.client} onChange={(e) => set("client", e.target.value)} className={input} placeholder="The Henderson Family" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => set("duration", e.target.value)} className={input} placeholder="6 weeks" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Media</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image URL</label>
            <input type="url" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} className={input} placeholder="https://images.unsplash.com/…" />
            {form.coverImage && (
              <img src={form.coverImage} alt="" className="mt-2 h-24 w-full object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gallery URLs <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea value={form.gallery} onChange={(e) => set("gallery", e.target.value)} className={textarea} rows={3} placeholder={"https://images.unsplash.com/photo1\nhttps://images.unsplash.com/photo2"} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Featured project</p>
              <p className="text-xs text-gray-400">Show this project in featured sections on the homepage</p>
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
          <Link href="/admin/projects" className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-60 rounded-lg transition-colors">
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create project"}
          </button>
        </div>
      </form>
    </div>
  );
}
