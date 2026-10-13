import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#26221c" }}>
        <div style={{ width: 120, height: 120, borderRadius: 999, border: "6px solid #8a7d6c", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "#f0a54a" }} />
        </div>
      </div>
    ),
    size,
  );
}
