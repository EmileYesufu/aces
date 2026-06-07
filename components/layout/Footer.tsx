import Link from "next/link";
import { MapPin, Trophy } from "lucide-react";
import { footerNav, policyLinks, siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-aces-navy text-gray-300">
      <Trophy
        className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 text-white/[0.03]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Venue</h3>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-aces-red-bright" />
              <span>{siteConfig.contact.address}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Our services</h3>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Policies</h3>
            <ul className="space-y-2">
              {policyLinks.map((policy) => (
                <li key={policy.slug}>
                  <Link href={`/policies/${policy.slug}`} className="hover:text-white transition-colors">
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">2026 Tournament</h3>
            <p className="text-sm leading-relaxed">
              The 18th annual ACES Nationals — invitation only tournament for elite junior boys and
              girls teams. May &amp; June 2026 at Riverside Sports Complex, Nottingham.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-aces-navy-light pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aces. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
