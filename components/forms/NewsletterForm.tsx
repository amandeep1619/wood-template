"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 py-3 text-gold">
        <CheckCircle2 size={18} />
        <span className="text-sm font-semibold">You&apos;re subscribed — thank you!</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-gold text-dark-wood font-semibold rounded text-sm hover:bg-gold-light disabled:opacity-70 transition-colors shrink-0"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-red-300 mt-2">
          <AlertCircle size={12} /> Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
