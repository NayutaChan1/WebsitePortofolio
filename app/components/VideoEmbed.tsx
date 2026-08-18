"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A click to load facade. The poster is served from our own public/ folder and
 * the YouTube player is only fetched once someone actually asks for it, so a
 * visitor who never presses play makes no third party request at all.
 */
export default function VideoEmbed({
  youtube,
  title,
  poster,
}: {
  youtube: string;
  title: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden border border-line bg-bg">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 cursor-pointer"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="border border-accent bg-bg/85 px-4 py-2.5 text-sm text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
                <span className="text-dim group-hover:text-bg">$ </span>
                play demo
                <span aria-hidden> ▶</span>
              </span>
            </span>
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-dim">
        <a
          href={`https://youtu.be/${youtube}`}
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-accent"
        >
          youtu.be/{youtube}
          <span aria-hidden> ↗</span>
        </a>
      </p>
    </div>
  );
}
