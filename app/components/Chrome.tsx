"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { windows } from "./windows";
import { profile } from "../data/profile";

const KEY_HELP = [
  { keys: "0 to 4", does: "jump to window" },
  { keys: "j / k", does: "next / previous window" },
  { keys: "g / G", does: "top / bottom" },
  { keys: "?", does: "toggle this help" },
];

function useActiveWindow() {
  const [active, setActive] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      frame.current = null;
      const line = window.innerHeight * 0.38;
      let current = 0;
      for (const w of windows) {
        const el = document.getElementById(w.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = w.index;
      }
      // Bottom of the page always resolves to the last window.
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        current = windows.length - 1;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame.current === null)
        frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return active;
}

function useClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Chrome() {
  const active = useActiveWindow();
  const clock = useClock();
  const [helpOpen, setHelpOpen] = useState(false);

  const goto = useCallback((index: number) => {
    const target = windows[index];
    if (!target) return;
    document.getElementById(target.id)?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      )
        return;

      if (/^[0-9]$/.test(event.key)) {
        const index = Number(event.key);
        if (index < windows.length) {
          event.preventDefault();
          goto(index);
        }
        return;
      }

      switch (event.key) {
        case "j":
          event.preventDefault();
          goto(Math.min(active + 1, windows.length - 1));
          break;
        case "k":
          event.preventDefault();
          goto(Math.max(active - 1, 0));
          break;
        case "g":
          event.preventDefault();
          goto(0);
          break;
        case "G":
          event.preventDefault();
          goto(windows.length - 1);
          break;
        case "?":
          event.preventDefault();
          setHelpOpen((open) => !open);
          break;
        case "Escape":
          setHelpOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goto]);

  const path = windows[active].path;

  return (
    <>
      {/* Title bar: a real terminal retitles itself with the working directory */}
      <header className="fixed inset-x-0 top-0 z-40 h-11 border-b border-line bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <div className="flex shrink-0 items-center gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-red/90" />
            <span className="size-3 rounded-full bg-yellow/90" />
            <span className="size-3 rounded-full bg-aqua/90" />
          </div>
          <p className="truncate text-xs text-muted sm:text-[13px]">
            <span className="text-aqua">
              {profile.handle}@{profile.host}
            </span>
            <span className="text-dim">:</span>
            <span className="text-blue">{path}</span>
            <span className="text-dim"> · tmux</span>
          </p>
          <span className="ml-auto hidden shrink-0 text-[11px] text-dim sm:inline">
            80×24
          </span>
        </div>
      </header>

      {/* Status bar: the tmux window list, doubling as navigation */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface"
      >
        {helpOpen && (
          <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
            <dl className="mb-2 grid grid-cols-2 gap-x-6 gap-y-1 border border-line bg-surface-2 p-3 text-[11px] sm:grid-cols-4">
              {KEY_HELP.map((row) => (
                <div key={row.keys} className="flex items-baseline gap-2">
                  <dt className="shrink-0 text-accent">{row.keys}</dt>
                  <dd className="truncate text-muted">{row.does}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mx-auto flex h-11 max-w-6xl items-stretch gap-0.5 px-3 text-[11px] sm:gap-2 sm:px-6 sm:text-[13px]">
          <span className="hidden shrink-0 items-center bg-accent px-2 font-bold text-bg sm:flex">
            {profile.handle}
          </span>

          <ul className="flex min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto sm:gap-1">
            {windows.map((w) => {
              const current = w.index === active;
              return (
                <li key={w.id} className="flex items-stretch">
                  <a
                    href={`#${w.id}`}
                    aria-current={current ? "true" : undefined}
                    className={`flex items-center px-1.5 whitespace-nowrap transition-colors sm:px-2 ${
                      current
                        ? "bg-fg font-bold text-bg"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {w.index}:{w.name}
                    {current ? "*" : ""}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setHelpOpen((open) => !open)}
            aria-expanded={helpOpen}
            className="hidden shrink-0 px-2 text-dim transition-colors hover:text-accent sm:block"
          >
            ?keys
          </button>

          <span className="hidden shrink-0 items-center gap-2 text-dim sm:flex">
            <span className="text-line">│</span>
            <time suppressHydrationWarning>{clock ?? "··:··"}</time>
          </span>
        </div>
      </nav>
    </>
  );
}
