"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Category = { id: string; name: string };

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
const textarea = `${input} resize-y`;
const select = `${input} bg-white`;

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogForm({ blogId }: { blogId?: string }) {
  const router = useRouter();
  const isEdit = !!blogId;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    categoryId: "", coverImage: "", tags: "",
    readTime: 5, authorName: "", authorRole: "", authorAvatar: "",
    featured: false, status: "draft",
    publishedAt: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetch("/api/admin/categories/blogs")
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []));
  }, []);

  useEffect(() => {
    if (!blogId) return;
    fetch(`/api/admin/blogs/${blogId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.data) return;
        const b = d.data;
        setForm({
          title: String(b.title ?? ""),
          slug: String(b.slug ?? ""),
          excerpt: String(b.excerpt ?? ""),
          content: String(b.content ?? ""),
          categoryId: String(b.categoryId ?? ""),
          coverImage: String(b.coverImage ?? ""),
          tags: Array.isArray(b.tags) ? (b.tags as string[]).join(", ") : String(b.tags ?? ""),
          readTime: Number(b.readTime ?? 5),
          authorName: String(b.authorName ?? ""),
          authorRole: String(b.authorRole ?? ""),
          authorAvatar: String(b.authorAvatar ?? ""),
          featured: Boolean(b.featured),
          status: String(b.status ?? "draft"),
          publishedAt: b.publishedAt ? String(b.publishedAt).split("T")[0] : new Date().toISOString().split("T")[0],
        });
      })
      .finally(() => setLoading(false));
  }, [blogId]);

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
        readTime: Number(form.readTime),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        publishedAt: new Date(form.publishedAt).toISOString(),
      };
      const url = isEdit ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin/blogs");
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
        <Link href="/admin/blogs" className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">{isEdit ? "Edit Post" : "New Blog Post"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Basic Info</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-500">*</span></label>
            <input required type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={input} placeholder="Choosing the Right Wood Species for Your Kitchen" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug <span className="text-red-500">*</span>
              <button type="button" onClick={() => setSlugLocked((l) => !l)} className="ml-2 text-xs text-amber-600 hover:underline">{slugLocked ? "(unlock)" : "(auto)"}</button>
            </label>
            <input required type="text" value={form.slug} onChange={(e) => { setSlugLocked(true); set("slug", e.target.value); }} className={input} />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Published Date</label>
              <input type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={input} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Read Time (min)</label>
              <input type="number" min={1} max={60} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} className={input} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
            <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} className={input} placeholder="wood species, kitchen, design" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Content</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt <span className="text-gray-400 font-normal">(shown in listings)</span></label>
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={textarea} rows={2} placeholder="Short summary shown in blog cards…" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content <span className="text-gray-400 font-normal">(supports Markdown)</span></label>
            <textarea value={form.content} onChange={(e) => set("content", e.target.value)} className={textarea} rows={12} placeholder="# Heading&#10;&#10;Your content here…" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Author & Media</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author Name</label>
              <input type="text" value={form.authorName} onChange={(e) => set("authorName", e.target.value)} className={input} placeholder="Tirath Singh" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author Role</label>
              <input type="text" value={form.authorRole} onChange={(e) => set("authorRole", e.target.value)} className={input} placeholder="Master Craftsman & Founder" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image URL</label>
            <input type="url" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} className={input} placeholder="https://images.unsplash.com/…" />
            {form.coverImage && <img src={form.coverImage} alt="" className="mt-2 h-24 w-full object-cover rounded-lg" />}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Featured post</p>
              <p className="text-xs text-gray-400">Show this post prominently on the blog page</p>
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
          <Link href="/admin/blogs" className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</Link>
          <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-60 rounded-lg transition-colors">
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
          </button>
        </div>
      </form>
    </div>
  );
}
