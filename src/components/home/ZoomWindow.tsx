"use client";

import Link from "next/link";
import { useRef, type ComponentType, type ReactNode } from "react";
import { services } from "@/content/services";
import { WindowFrame } from "@/components/desktop/Window";

/**
 * A small window's screen that opens a zoomed copy of the window when clicked: a native modal dialog
 * with the working demo inside. Escape, the red light or a click on the backdrop closes it.
 */
export function ZoomWindow({
  title,
  serviceSlug,
  Demo,
  children,
  demoHeight = "22rem",
}: {
  title: string;
  serviceSlug: string;
  Demo: ComponentType;
  children: ReactNode;
  demoHeight?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const service = services.find((s) => s.slug === serviceSlug);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        data-drag-ok
        onClick={() => dialog.current?.showModal()}
        className="block h-full w-full cursor-[inherit] text-left"
        aria-label={`Open ${title}: ${service?.title ?? ""} demo`}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className="zoom w-[44rem]"
        aria-label={title}
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <WindowFrame title={title} onClose={close} bodyClassName="overflow-y-auto">
          <div className="desk-dots" style={{ height: demoHeight }}>
            <Demo />
          </div>
          {service && (
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-black/10 bg-white p-5">
              <div className="max-w-md">
                <h2 className="text-[20px] leading-tight">{service.title.toLowerCase()}</h2>
                <p className="mt-1 text-[15px] leading-normal text-black/60">{service.short}</p>
              </div>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="pill-blue h-9 text-[15px]">
                start a project
              </Link>
            </div>
          )}
        </WindowFrame>
      </dialog>
    </>
  );
}
