import Prompt from "./Prompt";
import Section from "./Section";
import { contacts } from "../data/profile";

export default function Contact() {
  return (
    <Section id="contact">
      <Prompt command="cat contact.txt" cwd="~" as="h2" caret />

      <div className="mt-8">
        <p className="prose-body max-w-2xl">
          Open to internships and freelance work: web, mobile or data. Fastest
          way to reach me is email; I answer within a day.
        </p>

        <ul className="mt-10 max-w-3xl border-t border-line">
          {contacts.map((contact) => (
            <li key={contact.label} className="border-b border-line">
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5 transition-colors hover:bg-surface/60"
              >
                <span className="w-24 shrink-0 text-xs tracking-[0.15em] text-dim uppercase">
                  {contact.label}
                </span>
                <span className="text-base text-fg group-hover:text-accent sm:text-lg">
                  {contact.value}
                </span>
                <span
                  className="ml-auto text-sm text-dim group-hover:text-accent"
                  aria-hidden
                >
                  $ {contact.cmd} ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
