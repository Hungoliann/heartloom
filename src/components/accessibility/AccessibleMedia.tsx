// src/components/accessibility/AccessibleMedia.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "@/lib/accessibility/useAccessibility";

export interface CaptionTrack {
  src: string; // .vtt file
  srcLang: string; // e.g. "en"
  label: string; // e.g. "English"
  default?: boolean;
}

export interface AccessibleMediaProps {
  src: string;
  poster?: string;
  captions?: CaptionTrack[];
  /** Plain-text transcript shown in a collapsible region. */
  transcript?: string;
  className?: string;
}

export function AccessibleMedia({
  src,
  poster,
  captions = [],
  transcript,
  className,
}: AccessibleMediaProps) {
  const { settings } = useAccessibility();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Force captions on when the user prefers them by default.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !settings.captionsDefault) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].kind === "captions" || tracks[i].kind === "subtitles") {
        tracks[i].mode = "showing";
      }
    }
  }, [settings.captionsDefault]);

  return (
    <figure className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className="w-full rounded-2xl"
      >
        {captions.map((c) => (
          <track
            key={c.srcLang}
            kind="captions"
            src={c.src}
            srcLang={c.srcLang}
            label={c.label}
            default={settings.captionsDefault || c.default}
          />
        ))}
      </video>

      {transcript && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="font-sans text-sm font-medium text-[color:var(--brand-amber)] underline"
          >
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          {showTranscript && (
            <div className="mt-2 max-h-64 overflow-y-auto whitespace-pre-line rounded-xl bg-[color:var(--parchment-2)] p-4 font-sans text-sm leading-relaxed text-[color:var(--muted-text)]">
              {transcript}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
