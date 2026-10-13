"use client";

import { useEffect, useState } from "react";

/** In-page index that marks the section currently being read. The links work without JavaScript. */
export function SectionIndex({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <ul className="mt-3 space-y-1 border-l border-line text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className="-ml-px block border-l-2 border-transparent py-1 pl-3 transition-colors duration-[var(--dur-fast)] hover:text-ink aria-[current=location]:border-accent aria-[current=location]:text-ink"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
