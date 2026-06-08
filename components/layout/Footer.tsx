import Link from "next/link";
import { MapPin, Trophy } from "lucide-react";
import { footerNav, policyLinks, siteConfig } from "@/content/site";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-aces-navy text-gray-300">
      <Trophy
        className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 text-white/[0.03]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-center gap-6 rounded-2xl border border-aces-navy-light bg-white/5 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Stay in the loop
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Get ACES Nationals announcements, entry updates, and tournament news straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>

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
            <h3 className="mb-4 text-lg font-semibold text-white">Follow us</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Keep up with the ACES Nationals on social media — highlights, news, and tournament updates.
            </p>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-aces-red-bright" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-aces-navy-light pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aces. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
