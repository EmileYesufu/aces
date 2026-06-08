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
        subtitle="Action, atmosphere, and memories from this year's ACES Nationals tournament weekends."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2026 Photo Gallery" },
        ]}
      />

      <Section>
        <PhotoGallery photos={photos} year={galleryYear} />
      </Section>
    </>
  );
}
