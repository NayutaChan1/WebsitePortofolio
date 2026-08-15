import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-xs text-dim">
        <p>
          <span className="text-aqua">[Process exited 0]</span> — thanks for
          scrolling.
        </p>
        <p>
          © {year} {profile.name} · built with Next.js and Tailwind
        </p>
      </div>
    </footer>
  );
}
