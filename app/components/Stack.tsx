import Prompt from "./Prompt";
import Section from "./Section";
import { recentNote, stack, stackNote } from "../data/profile";

export default function Stack() {
  const fileCount = stack.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Section id="stack">
      <Prompt command="tree ~/stack/*" cwd="~" as="h2" />

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted sm:text-sm">
        <span className="text-accent"># </span>
        {stackNote}
      </p>

      <div className="mt-8 gap-x-12 text-sm sm:columns-2 xl:columns-3">
        {stack.map((group) => (
          <div key={group.dir} className="mb-8 break-inside-avoid">
            <p className="text-accent">{group.dir}/</p>
            <ul>
              {group.items.map((item, i) => {
                const last = i === group.items.length - 1;
                const name = typeof item === "string" ? item : item.name;
                const recent = typeof item !== "string";

                return (
                  <li
                    key={name}
                    className="flex items-baseline py-0.5 leading-relaxed"
                  >
                    <span
                      className="shrink-0 whitespace-pre text-dim select-none"
                      aria-hidden
                    >
                      {last ? "└── " : "├── "}
                    </span>
                    <span className="text-fg">
                      {name}
                      {recent && <span className="text-yellow"> *</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs text-dim">
        {stack.length} directories, {fileCount} files
        <br />
        <span className="text-yellow">*</span> {recentNote}
      </p>
    </Section>
  );
}
