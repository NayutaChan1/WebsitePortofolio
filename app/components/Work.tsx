import Prompt from "./Prompt";
import Section from "./Section";
import { projects, type Project } from "../data/projects";

function Listing({ project }: { project: Project }) {
  return (
    <a
      href={`#${project.slug}`}
      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-1.5 text-xs sm:text-sm"
    >
      <span className="text-dim">{project.perms}</span>
      <span className="hidden text-dim sm:inline">rafael staff</span>
      <span className="text-dim">{project.kind}</span>
      <span className="text-dim">{project.date}</span>
      <span className="text-blue underline-offset-4 group-hover:text-accent group-hover:underline">
        {project.dir}/
      </span>
    </a>
  );
}

function Panel({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="scroll-mt-20">
      <Prompt command={`cat ${project.dir}/README.md`} cwd="~/work" />

      <div className="mt-5 border border-line bg-surface/50">
        {/* header */}
        <header className="border-b border-line p-5 sm:p-8">
          <h3 className="text-2xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
            {project.tagline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="border border-line px-2 py-1 text-[11px] text-purple"
              >
                {tag}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-dim">
            <span className="text-accent"># </span>
            {project.context}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`group px-4 py-2.5 text-sm transition-colors ${
                  i === 0
                    ? "border border-accent text-accent hover:bg-accent hover:text-bg"
                    : "border border-line text-muted hover:border-fg hover:text-fg"
                }`}
              >
                <span className="text-dim group-hover:text-inherit">$ </span>
                {link.cmd}{" "}
                <span className="underline underline-offset-4">
                  {link.label}
                </span>
                <span aria-hidden> ↗</span>
              </a>
            ))}
          </div>
        </header>

        {/* overview */}
        <div className="border-b border-line p-5 sm:p-8">
          <h4 className="text-xs tracking-[0.2em] text-accent uppercase">
            overview
          </h4>
          <div className="mt-4 max-w-3xl space-y-4">
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* features */}
        <div className="border-b border-line p-5 sm:p-8">
          <h4 className="text-xs tracking-[0.2em] text-accent uppercase">
            what it does
          </h4>
          <ul className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature.title}>
                <p className="text-sm text-fg">
                  <span className="text-aqua select-none">▸ </span>
                  {feature.title}
                </p>
                <p className="prose-body mt-1.5 pl-4 text-[0.875rem]">
                  {feature.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* stack */}
        <div className="border-b border-line p-5 sm:p-8">
          <h4 className="text-xs tracking-[0.2em] text-accent uppercase">
            stack
          </h4>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-136 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-dim">
                  <th scope="col" className="py-2 pr-6 font-normal">
                    layer
                  </th>
                  <th scope="col" className="py-2 font-normal">
                    technology
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.stack.map((row) => (
                  <tr key={row.layer} className="border-b border-line/60">
                    <th
                      scope="row"
                      className="w-40 py-2.5 pr-6 align-top font-normal whitespace-nowrap text-yellow"
                    >
                      {row.layer}
                    </th>
                    <td className="py-2.5 align-top text-muted">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* roadmap */}
        <div className="p-5 sm:p-8">
          <h4 className="text-xs tracking-[0.2em] text-accent uppercase">
            next up
          </h4>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm">
            {project.roadmap.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="shrink-0 text-dim select-none">TODO</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <Prompt command="ls -la" cwd="~/work" as="h2" />

      <div className="mt-5 border-l-2 border-line pl-4 sm:pl-5">
        <p className="text-xs text-dim">total {projects.length}</p>
        {projects.map((project) => (
          <Listing key={project.slug} project={project} />
        ))}
        <p className="pt-2 text-xs text-dim">
          <span className="text-accent"># </span>
          more coming — this listing grows as projects ship
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {projects.map((project) => (
          <Panel key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
