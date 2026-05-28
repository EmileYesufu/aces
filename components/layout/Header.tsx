"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { mainNav, siteConfig } from "@/content/site";
import { InstagramIcon, YoutubeIcon, FacebookIcon, XIcon } from "@/components/ui/SocialIcons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red",
      isActive(pathname, href)
        ? "text-aces-red underline decoration-aces-red decoration-2 underline-offset-4"
        : "text-aces-navy hover:bg-gray-50"
    );

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-aces-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className={cn("bg-aces-navy text-sm text-gray-300 transition-all", scrolled && "hidden sm:block")}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">{siteConfig.contact.email}</span>
          </a>
          <div className="flex items-center gap-4">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white transition-colors">
              <XIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-gray-200 bg-white shadow-sm transition-all duration-300",
          scrolled && "shadow-md"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3 py-2" aria-label="ACES Nationals — home">
            <Image
              src="/logo.png"
              alt="ACES Nationals Tournament"
              width={500}
              height={500}
              className={cn("w-auto transition-all duration-300", scrolled ? "h-11" : "h-14")}
              priority
            />
            <span className="hidden font-display text-lg font-bold uppercase leading-none tracking-tight text-aces-navy sm:block">
              ACES Nationals
              <span className="block text-xs font-medium tracking-wide text-aces-muted">National Finals 2026</span>
            </span>
          </Link>

          <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-1" aria-label="Main navigation">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onFocus={() => setOpenDropdown(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenDropdown(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenDropdown(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(navLinkClass(item.href), "flex items-center gap-1")}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aces-red",
                            isActive(pathname, child.href)
                              ? "bg-aces-red/5 font-medium text-aces-red"
                              : "text-aces-navy hover:bg-gray-50"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/tournament/register" size="sm" className="hidden rounded-full lg:inline-flex">
              Register Interest
            </Button>
            <button
              type="button"
              className="rounded-md p-2 text-aces-navy lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-aces-navy/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <span className="font-display text-lg font-bold text-aces-navy">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
                <X className="h-6 w-6 text-aces-navy" />
              </button>
            </div>

            <div className="flex gap-2 border-b border-gray-100 px-4 py-3">
              <Link
                href="/tournament/register"
                className="flex-1 rounded-md bg-aces-red py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-1 rounded-md border border-aces-navy py-2.5 text-sm font-semibold text-aces-navy"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <Link
                href="/contact"
                className="flex flex-1 items-center justify-center gap-1 rounded-md border border-aces-navy py-2.5 text-sm font-semibold text-aces-navy"
                onClick={() => setMobileOpen(false)}
              >
                <MapPin className="h-4 w-4" />
                Map
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {mainNav.map((item) => (
                <div key={item.label} className="border-b border-gray-100 py-3 last:border-0">
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-lg font-medium",
                      isActive(pathname, item.href) ? "text-aces-red" : "text-aces-navy"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block py-2 text-base",
                            isActive(pathname, child.href) ? "font-medium text-aces-red" : "text-aces-muted"
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
