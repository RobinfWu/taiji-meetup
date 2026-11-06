"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Play, X } from "lucide-react";

interface VideoDemonstrationProps {
  videoId: string;
  methodName: string;
  translation: string;
  description?: string;
}

/** Compact method row; the full-width player loads only after activation. */
export function VideoDemonstration({ videoId, methodName, translation, description }: VideoDemonstrationProps) {
  const [active, setActive] = useState(false);
  const playerId = useId();
  const previewRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasActive = useRef(false);

  useEffect(() => {
    if (active) closeRef.current?.focus({ preventScroll: true });
    else if (wasActive.current) previewRef.current?.focus({ preventScroll: true });
    wasActive.current = active;
  }, [active]);

  return (
    <article
      className="py-4 space-y-3"
      onKeyDown={(event) => {
        if (event.key === "Escape" && active) {
          event.preventDefault();
          setActive(false);
        }
      }}
    >
      <div className="grid min-[380px]:grid-cols-[minmax(0,1fr)_144px] sm:grid-cols-[minmax(0,1fr)_176px] items-center gap-3 sm:gap-6">
        <div className="min-w-0 space-y-1.5">
          <h3 className="font-serif text-2xl font-semibold">{methodName}</h3>
          <p className="text-sm text-[#243B45]">{translation}</p>
          <p className="text-xs text-[#5A5E5B]">Demonstrated by Chen Yu</p>
          {description && <p className="text-sm text-[#303331] leading-relaxed">{description}</p>}
        </div>
        <button
          ref={previewRef}
          type="button"
          aria-label={`${active ? "Close" : "Watch"} ${methodName} demonstration by Chen Yu`}
          aria-controls={playerId}
          aria-expanded={active}
          onClick={() => setActive(!active)}
          className="group relative w-44 max-w-full min-[380px]:w-full aspect-video rounded-lg overflow-hidden bg-[#171918] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B3D2E]"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            alt=""
            width={320}
            height={180}
            unoptimized
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-black/15 group-hover:bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#171918]/85 text-[#E8E4DA]">
              {active ? <X aria-hidden="true" className="w-4 h-4" /> : <Play aria-hidden="true" className="w-4 h-4" />}
            </span>
          </span>
        </button>
      </div>
      <div id={playerId} hidden={!active} className="space-y-2">
        {active && (
          <>
            <div className="relative w-full aspect-video rounded-xl bg-[#171918]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                title={`${methodName} demonstration by Chen Yu`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0 rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${methodName} demonstration by Chen Yu on YouTube`}
                className="text-[#243B45] underline underline-offset-4"
              >
                Watch on YouTube
              </a>
              <button
                ref={closeRef}
                type="button"
                aria-label={`Close ${methodName} demonstration and return to preview`}
                aria-controls={playerId}
                onClick={() => setActive(false)}
                className="inline-flex items-center gap-1.5 py-2 text-[#243B45] cursor-pointer"
              >
                <X aria-hidden="true" className="w-3.5 h-3.5" />
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
