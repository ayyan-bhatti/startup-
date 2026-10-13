import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${siteConfig.name}: ${siteConfig.tagline}`;

const rings = [150, 205, 260, 315];

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#14110e",
          color: "#f3ece1",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {rings.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: 930 - r,
              top: 315 - r,
              width: r * 2,
              height: r * 2,
              borderRadius: 999,
              border: "2px solid #3b352d",
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 870, top: 255, width: 120, height: 120, borderRadius: 999, background: "#f0a54a" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, width: 760 }}>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.tagline}</div>
            <div style={{ fontSize: 28, color: "#d3cabc", marginTop: 24, lineHeight: 1.4 }}>
              Websites, 3D and interactive websites, mobile apps, custom software, AI automation, SEO and branding
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
