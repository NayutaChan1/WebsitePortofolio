import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Prompt from "./Prompt";
import Section from "./Section";
import { profile } from "../data/profile";

const LOGO = `██████╗ ███████╗
██╔══██╗██╔════╝
██████╔╝█████╗
██╔══██╗██╔══╝
██║  ██║██║
╚═╝  ╚═╝╚═╝     `;

const SWATCHES = [
  "bg-red",
  "bg-accent",
  "bg-yellow",
  "bg-aqua",
  "bg-blue",
  "bg-purple",
  "bg-fg",
  "bg-dim",
];

/**
 * Resolved at build time. Drop the portrait into `public/` and it appears;
 * with no file there, the block prints the ASCII monogram instead.
 */
function findAvatar() {
  const name = profile.avatarNames.find((file) =>
    fs.existsSync(path.join(process.cwd(), "public", file)),
  );
  return name ? `/${name}` : null;
}

export default function About() {
  const avatar = findAvatar();

  return (
    <Section id="about">
      <Prompt command="neofetch" cwd="~" as="h2" />

      <div className="mt-8 flex flex-col gap-8 border border-line bg-surface/50 p-5 sm:p-8 md:flex-row md:gap-12">
        {avatar ? (
          <div className="relative aspect-square w-40 shrink-0 overflow-hidden border border-line bg-surface-2 sm:w-44">
            <Image
              src={avatar}
              alt={profile.avatarAlt}
              fill
              sizes="176px"
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <pre
            aria-label="ASCII monogram: R F"
            className="shrink-0 text-[10px] leading-[1.15] text-accent sm:text-xs"
          >
            {LOGO}
          </pre>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm">
            <span className="font-bold text-aqua">
              {profile.handle}@{profile.host}
            </span>
          </p>
          <div className="my-2 h-px w-full max-w-xs bg-line" />

          <dl className="space-y-1.5 text-sm">
            {profile.fetch.map((row) => (
              <div key={row.key} className="flex flex-wrap gap-x-2">
                <dt className="w-24 shrink-0 text-accent">{row.key}</dt>
                <dd className="min-w-0 flex-1 text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex" aria-hidden>
            {SWATCHES.map((color) => (
              <span key={color} className={`h-4 w-6 sm:w-8 ${color}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Prompt command="cat about.txt" cwd="~" />
        <div className="mt-5 max-w-3xl space-y-4 border-l-2 border-line pl-4 sm:pl-5">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="prose-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
