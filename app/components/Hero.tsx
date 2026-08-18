import Prompt from "./Prompt";
import { profile } from "../data/profile";

const ROLE_COLOR = ["text-accent", "text-aqua", "text-purple"];

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-14 px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <Prompt command="whoami" typing delay={150} />

        <h1
          className="rise mt-8 text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.88] font-bold tracking-tighter"
          style={{ animationDelay: "700ms" }}
        >
          Rafael
          <br />
          Febrian
        </h1>

        <div
          className="rise mt-8 max-w-2xl border-l-2 border-accent pl-4 sm:pl-5"
          style={{ animationDelay: "900ms" }}
        >
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-2">
                {i > 0 && <span className="text-line">·</span>}
                <span className={ROLE_COLOR[i % ROLE_COLOR.length]}>
                  {role}
                </span>
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm text-muted">
            {profile.school} · {profile.job} · {profile.location}
          </p>
        </div>

        <div
          className="rise mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "1050ms" }}
        >
          <a
            href="#work"
            className="group border border-accent px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            <span className="text-dim group-hover:text-bg">$ </span>
            ./work.sh
          </a>
          <a
            href="#contact"
            className="group border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <span className="text-dim group-hover:text-fg">$ </span>
            cat contact.txt
          </a>
        </div>

        <p
          className="rise mt-14 hidden text-xs text-dim sm:block"
          style={{ animationDelay: "1250ms" }}
        >
          <span className="text-accent">tip</span> · this page is a tmux
          session. Press{" "}
          <kbd className="border border-line px-1 text-muted">0</kbd> to{" "}
          <kbd className="border border-line px-1 text-muted">4</kbd> to switch
          windows, <kbd className="border border-line px-1 text-muted">?</kbd>{" "}
          for keys.
        </p>
      </div>
    </section>
  );
}
