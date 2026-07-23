"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 text-gold">
        <CheckCircle2 size={18} />
        <span className="text-sm font-semibold">You&apos;re subscribed — thank you!</span>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold"
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gold text-dark-wood font-semibold rounded text-sm hover:bg-gold-light transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
