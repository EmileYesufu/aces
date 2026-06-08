import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { getTournamentGalleryPhotos } from "@/content/tournament-gallery";

const galleryYear = 2026;

export const metadata: Metadata = {
  title: "2026 Photo Gallery",
  description:
    "Photos from the ACES Nationals 2026 tournament at Riverside Sports Complex, Nottingham.",
};

export default function GalleryPage() {
  const photos = getTournamentGalleryPhotos();

  return (
    <>
      <PageHero
        title="2026 Photo Gallery"
        subtitle="Photos from the 2026 ACES Nationals — 2027 gallery coming after the tournament."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <Section>
        <PhotoGallery photos={photos} year={galleryYear} />
      </Section>
    </>
  );
}
