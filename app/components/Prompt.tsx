import type { ReactNode } from "react";

/**
 * A command line. Every section opens with one, and the command names what
 * the section actually contains. The heading is the command.
 */
export default function Prompt({
  command,
  cwd = "~",
  as: Tag = "p",
  typing = false,
  delay = 0,
  caret = false,
  children,
}: {
  command: string;
  cwd?: string;
  as?: "h1" | "h2" | "p";
  typing?: boolean;
  delay?: number;
  caret?: boolean;
  children?: ReactNode;
}) {
  const chars = command.length;

  return (
    <Tag className="flex flex-wrap items-baseline gap-x-2 text-sm sm:text-base">
      <span className="text-dim select-none">
        <span className="text-aqua">{cwd}</span>
        <span className="text-accent"> $</span>
      </span>
      <span
        className={typing ? "type text-fg" : "text-fg"}
        style={
          typing
            ? ({
                "--chars": `${chars}ch`,
                "--steps": chars,
                animationDelay: `${delay}ms`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {command}
      </span>
      {children}
      {caret && <span className="caret" aria-hidden />}
    </Tag>
  );
}
