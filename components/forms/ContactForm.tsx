"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const services = [
  "Custom Furniture",
  "Kitchen Cabinets",
  "Interior Woodwork",
  "Office Furniture",
  "Renovation Woodwork",
  "Wood Restoration",
  "Not sure yet",
];

const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-8 text-center bg-beige rounded-2xl border border-wood-200/50"
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-dark-wood mb-3">
          Message Received!
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for reaching out. We'll review your project details and get back to you within one business day.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }}
          className="mt-6 text-sm font-semibold text-walnut hover:text-dark-wood transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-dark-wood mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John & Sarah Smith"
            className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood placeholder:text-dark-wood/30 text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-dark-wood mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood placeholder:text-dark-wood/30 text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-dark-wood mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="(212) 555-0000"
          className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood placeholder:text-dark-wood/30 text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all"
        />
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-dark-wood mb-1.5">
            Service Interested In <span className="text-red-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-dark-wood mb-1.5">
            Approximate Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a budget range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-dark-wood mb-1.5">
          Tell Us About Your Project <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your vision — dimensions, wood species preferences, timeline, anything that helps us understand your project..."
          className="w-full px-4 py-3 rounded-lg border border-wood-200 bg-white text-dark-wood placeholder:text-dark-wood/30 text-sm focus:outline-none focus:ring-2 focus:ring-walnut/30 focus:border-walnut transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
          <AlertCircle size={15} />
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-walnut text-cream font-semibold rounded text-sm tracking-wide hover:bg-dark-wood disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending Your Message...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-center text-muted-foreground">
        We typically respond within one business day. Your information is kept private.
      </p>
    </form>
  );
}
