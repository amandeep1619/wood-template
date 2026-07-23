import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Tirath Wood Works for a free consultation. We'll respond within one business day and help you plan your perfect custom woodwork project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/contact",
    title: "Contact Us | Tirath Wood Works",
    description:
      "Get in touch for a free consultation. We'll respond within one business day and help you plan your custom woodwork project.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Get in Touch",
      },
    ],
  },
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "(212) 555-1234",
    href: "tel:+12125551234",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@artisanwoodco.com",
    href: "mailto:hello@artisanwoodco.com",
  },
  {
    icon: MapPin,
    label: "Workshop",
    value: "48 Craftsman Way, White Plains, NY 10601",
    href: "https://maps.google.com",
  },
];

const hours = [
  { day: "Monday – Friday", time: "8:00am – 6:00pm" },
  { day: "Saturday", time: "9:00am – 3:00pm" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1600&q=80"
            alt="Workshop"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Let's Build
              <br />
              <span className="italic text-gold">Something Together</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl leading-relaxed">
              Every great piece starts with a conversation. Reach out and we'll respond within one business day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <ScrollReveal>
                <h2 className="font-serif text-2xl font-bold text-dark-wood mb-6">
                  Reach Us Directly
                </h2>
                <div className="space-y-5">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 bg-walnut rounded-xl flex items-center justify-center shrink-0 group-hover:bg-dark-wood transition-colors">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                        <p className="text-sm text-dark-wood font-medium group-hover:text-walnut transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </ScrollReveal>

              {/* Hours */}
              <ScrollReveal delay={0.1}>
                <div className="p-6 bg-white rounded-xl border border-wood-200/50">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Clock size={16} className="text-gold" />
                    <h3 className="text-sm font-semibold text-dark-wood tracking-tight">Workshop Hours</h3>
                  </div>
                  <ul className="space-y-3">
                    {hours.map(({ day, time }) => (
                      <li key={day} className="flex justify-between items-center pb-2 border-b border-wood-100 last:border-0 last:pb-0">
                        <span className="text-sm text-dark-wood/70 font-medium">{day}</span>
                        <span className={`text-sm font-semibold ${time === "Closed" ? "text-muted-foreground" : "text-dark-wood"}`}>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* FAQ quick link */}
              <ScrollReveal delay={0.2}>
                <div className="p-5 bg-walnut rounded-xl border border-walnut text-white">
                  <h4 className="text-sm font-semibold mb-2">Have quick questions?</h4>
                  <p className="text-sm text-white/70 mb-3">Check our FAQ for common questions about process, pricing, and timeline.</p>
                  <a href="/#faq" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-light transition-colors">
                    View FAQ <ArrowRight size={12} />
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-2xl p-8 md:p-10 border border-wood-200/50 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-dark-wood mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Tell us about your project. The more detail, the better — it helps us prepare for your consultation.
                  </p>
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-dark-wood h-72 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="text-gold mx-auto mb-3" />
            <p className="text-white/60 text-sm">48 Craftsman Way, White Plains, NY 10601</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Get Directions <ArrowRight size={13} />
            </a>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-dark-wood/50 to-walnut/20 pointer-events-none" />
      </section>

      {/* Quick contact strip */}
      <section className="py-12 bg-beige">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-dark-wood mb-1">Prefer to call?</h3>
              <p className="text-muted-foreground text-sm">We're available Monday through Friday, 8am–6pm.</p>
            </div>
            <a
              href="tel:+12125551234"
              className="inline-flex items-center gap-3 px-8 py-4 bg-walnut text-cream font-semibold rounded text-sm tracking-wide hover:bg-dark-wood transition-colors"
            >
              <Phone size={16} />
              (212) 555-1234
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
