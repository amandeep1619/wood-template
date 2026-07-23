import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const footerLinks = {
  services: [
    { label: "Custom Kitchen Cabinetry", href: "/services/custom-kitchen-cabinetry" },
    { label: "Furniture & Bedroom", href: "/services/furniture-and-bedroom" },
    { label: "Commercial Woodwork", href: "/services/commercial-woodwork" },
    { label: "Built-ins & Shelving", href: "/services/built-ins-and-shelving" },
    { label: "Outdoor Structures", href: "/services/outdoor-structures" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Free Quote", href: "/contact#quote" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-wood text-white">
      {/* Main footer */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 bg-walnut rounded-sm flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L4 8v12h4v-7h6v7h4V8L11 2z" fill="#FAF8F5" />
                  <rect x="9" y="13" width="4" height="7" fill="#D4A373" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block leading-none">Artisan</span>
                <span className="text-xs text-gold tracking-widest uppercase">Wood Co.</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Master woodworkers crafting heirloom-quality custom furniture, cabinetry, and architectural millwork since 1998.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-walnut hover:border-walnut hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-walnut hover:border-walnut hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-walnut hover:border-walnut hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">
                  48 Craftsman Way,<br />
                  White Plains, NY 10601
                </p>
              </li>
              <li>
                <a href="tel:+12125551234" className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors group">
                  <Phone size={16} className="text-gold shrink-0" />
                  (212) 555-1234
                </a>
              </li>
              <li>
                <a href="mailto:hello@artisanwoodco.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold shrink-0" />
                  hello@artisanwoodco.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-2">Workshop Hours</p>
              <p className="text-sm text-white/60">Mon – Fri: 8:00am – 6:00pm</p>
              <p className="text-sm text-white/60">Saturday: 9:00am – 3:00pm</p>
              <p className="text-sm text-white/40">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Artisan Wood Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="text-xs text-white/40 hover:text-white/70 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
