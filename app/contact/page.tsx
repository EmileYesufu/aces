import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { siteConfig } from "@/content/site";
import { MapPin } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { SocialFeedSection } from "@/components/home/SocialFeed";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send an enquiry to the ACES Nationals team — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Send us an enquiry — we'd love to hear from you."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div id="enquiry">
              <h2 className="mb-2 font-bold text-aces-navy">Send an enquiry</h2>
              <p className="mb-6 text-aces-muted">
                Fill in the form and the ACES team will get back to you as soon as possible.
              </p>
              <EnquiryForm />
            </div>

            <Card hover={false}>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-aces-red" />
                <div>
                  <h2 className="font-bold text-aces-navy">Location</h2>
                  <p className="mt-1 text-aces-muted">{siteConfig.contact.address}</p>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="mb-4 font-bold text-aces-navy">Follow us</h2>
              <div className="flex gap-4">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-gray-100 p-3 text-aces-navy hover:bg-aces-red hover:text-white transition-colors">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full bg-gray-100 p-3 text-aces-navy hover:bg-aces-red hover:text-white transition-colors">
                  <YoutubeIcon className="h-5 w-5" />
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-gray-100 p-3 text-aces-navy hover:bg-aces-red hover:text-white transition-colors">
                  <FacebookIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button href="/tournament/register" size="lg">
              Register Interest
            </Button>
          </div>

          <div className="aspect-square overflow-hidden rounded-xl lg:aspect-auto lg:h-full lg:min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38487.07034469801!2d-1.2116822221269175!3d52.9224738195695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c242818d33a3%3A0x9aba9848c667e43a!2sNottingham%20NG7%202SA!5e0!3m2!1sen!2suk!4v1492696678166"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Riverside Sports Complex map"
            />
          </div>
        </div>
      </Section>
      <SocialFeedSection />
    </>
  );
}
