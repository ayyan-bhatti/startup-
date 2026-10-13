/**
 * Static picture of the core. Rendered on the server, so the hero is complete on first paint.
 * It stays as the final image on phones, low-power devices, reduced motion and browsers without WebGL.
 */
function polygon(cx: number, cy: number, r: number, sides: number, rot: number) {
  return Array.from({ length: sides }, (_, i) => {
    const a = rot + (i / sides) * Math.PI * 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

export function CoreStatic({ shells = 6, pulse = false, className = "" }: { shells?: number; pulse?: boolean; className?: string }) {
  const id = `core-glow-${shells}`;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#f0a54a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f0a54a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: shells }, (_, i) => (
        <polygon
          key={i}
          points={polygon(200, 200, 80 + i * 22, 10 + i * 2, i * 0.45)}
          fill="none"
          stroke="#6a5f52"
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity={0.95 - i * 0.08}
        />
      ))}
      <circle cx="200" cy="200" r="78" fill={`url(#${id})`} />
      <g className={pulse ? "core-pulse" : undefined}>
        <polygon points={polygon(200, 200, 34, 10, 0.3)} fill="#f0a54a" />
      </g>
    </svg>
  );
}
