import { VideoEmbed } from "@/components/ui/VideoEmbed";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  className?: string;
};

/** @deprecated Prefer VideoEmbed with provider="youtube" */
export function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  return <VideoEmbed provider="youtube" id={id} title={title} className={className} />;
}
