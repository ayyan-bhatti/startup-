import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${siteConfig.name}: ${siteConfig.tagline}`;

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0b1020 0%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, border: "6px solid white" }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.tagline}</div>
          <div style={{ fontSize: 30, color: "#a5b4fc", marginTop: 24 }}>
            Websites · Apps · SEO · Branding · Automation
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
