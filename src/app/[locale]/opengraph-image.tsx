import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0A0A0F 0%, #1a1035 50%, #0A0A0F 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.6,
            letterSpacing: 4,
            textTransform: "uppercase" as const,
          }}
        >
          BRBots S/A
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Comunicacao Automatizada Inteligente
        </div>
      </div>
    ),
    size
  );
}
