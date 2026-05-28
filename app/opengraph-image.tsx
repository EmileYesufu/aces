import { ImageResponse } from "next/og";

export const alt = "ACES Nationals 2026 Football Tournament";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #002237 0%, #0a3554 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d30f29",
          }}
        >
          18th Annual · May &amp; June 2026
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          ACES Nationals
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 96,
            fontWeight: 800,
            color: "#d30f29",
          }}
        >
          2026
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 32, color: "#cbd5e1" }}>
          Elite junior football · Riverside Sports Complex, Nottingham
        </div>
      </div>
    ),
    size
  );
}
