"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Custom Kitchen Cabinetry", href: "/services/custom-kitchen-cabinetry" },
      { label: "Furniture & Bedroom", href: "/services/furniture-and-bedroom" },
      { label: "Commercial Woodwork", href: "/services/commercial-woodwork" },
      { label: "Built-ins & Shelving", href: "/services/built-ins-and-shelving" },
      { label: "Outdoor Structures", href: "/services/outdoor-structures" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-wood-200/60"
            : "bg-transparent"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-walnut rounded-sm flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6 duration-300">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 2L4 8v12h4v-7h6v7h4V8L11 2z" fill="#FAF8F5" />
                  <rect x="9" y="13" width="4" height="7" fill="#D4A373" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-serif text-lg font-bold tracking-tight transition-colors",
                    scrolled || !isHome ? "text-dark-wood" : "text-white"
                  )}
                >
                  Artisan
                </span>
                <span
                  className={cn(
                    "text-xs font-medium tracking-[0.15em] uppercase transition-colors",
                    scrolled || !isHome ? "text-gold-dark" : "text-gold"
                  )}
                >
                  Wood Co.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200",
                        scrolled || !isHome
                          ? "text-dark-wood hover:text-walnut"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-wood-200/60 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 text-sm text-dark-wood hover:bg-cream hover:text-walnut border-b border-wood-100 last:border-0 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors duration-200 relative group",
                      scrolled || !isHome
                        ? pathname === link.href
                          ? "text-walnut"
                          : "text-dark-wood hover:text-walnut"
                        : pathname === link.href
                        ? "text-gold"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+12125551234"
                className={cn(
                  "hidden md:flex items-center gap-2 text-sm font-medium transition-colors",
                  scrolled || !isHome
                    ? "text-dark-wood hover:text-walnut"
                    : "text-white/90 hover:text-white"
                )}
              >
                <Phone size={14} />
                <span>(212) 555-1234</span>
              </a>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-walnut text-cream text-sm font-semibold rounded tracking-wide hover:bg-dark-wood transition-colors duration-200"
              >
                Free Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "lg:hidden p-2 rounded transition-colors",
                  scrolled || !isHome
                    ? "text-dark-wood hover:bg-wood-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-dark-wood lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-walnut rounded-sm flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L4 8v12h4v-7h6v7h4V8L11 2z" fill="#FAF8F5" />
                    <rect x="9" y="13" width="4" height="7" fill="#D4A373" />
                  </svg>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-white block leading-none">Artisan</span>
                  <span className="text-xs text-gold tracking-widest uppercase">Wood Co.</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white p-2"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {link.children ? (
                      <div>
                        <span className="block py-3 text-base font-medium text-white/50 border-b border-white/10 mb-2 tracking-wide">
                          {link.label}
                        </span>
                        <ul className="pl-4 space-y-1">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block py-2 text-base text-white/80 hover:text-gold transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "block py-3 text-xl font-medium border-b border-white/10 transition-colors",
                          pathname === link.href ? "text-gold" : "text-white hover:text-gold"
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="px-6 py-8 border-t border-white/10 space-y-4">
              <a href="tel:+12125551234" className="flex items-center gap-3 text-white/80 hover:text-white">
                <Phone size={16} />
                <span>(212) 555-1234</span>
              </a>
              <Link
                href="/contact"
                className="block w-full py-3 text-center bg-gold text-dark-wood font-semibold rounded text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
