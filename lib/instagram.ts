export type InstagramPost = {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  timestamp: number;
};

const IG_APP_ID = "936619743392459";

export async function fetchInstagramPosts(
  username: string,
  limit = 6
): Promise<InstagramPost[]> {
  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "x-ig-app-id": IG_APP_ID,
          "User-Agent": "Mozilla/5.0 (compatible; ACESWebsite/1.0)",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    const edges =
      data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];

    return edges.slice(0, limit).map(
      (edge: {
        node: {
          id: string;
          shortcode: string;
          thumbnail_src: string;
          edge_media_to_caption: { edges: { node: { text: string } }[] };
          taken_at_timestamp: number;
        };
      }) => ({
        id: edge.node.id,
        url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        thumbnail: edge.node.thumbnail_src,
        caption: edge.node.edge_media_to_caption.edges[0]?.node.text ?? "",
        timestamp: edge.node.taken_at_timestamp,
      })
    );
  } catch {
    return [];
  }
}
