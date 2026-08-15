# Rafael Febrian — Personal Portfolio

Personal portfolio site. The whole page is styled as a single **tmux session**: each section is a
window, the status bar at the bottom is the navigation, and every section opens with the shell
command that produced it (`whoami`, `neofetch`, `ls -la`, `tree`, `contact --send`).

## Live demo

Not deployed yet. See [Deploying](#deploying).

## Sections

| Window | Section | Command |
| --- | --- | --- |
| 0 | Home | `whoami` |
| 1 | About | `neofetch` · `cat about.txt` |
| 2 | Work | `ls -la ~/work` · `cat <project>/README.md` |
| 3 | Stack | `tree ~/stack/*` |
| 4 | Contact | `contact --send` |

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `0`–`4` | Jump to a window |
| `j` / `k` | Next / previous window |
| `g` / `G` | Top / bottom |
| `?` | Toggle the key help |

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, tokens defined in `app/globals.css`
- **Fonts:** JetBrains Mono (terminal chrome) + IBM Plex Sans (running prose), via `next/font`
- **Palette:** gruvbox-dark

The page is fully static — no client data fetching, no database.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Editing your content

All copy lives in two data files — you should not need to touch the components:

- [`app/data/profile.ts`](app/data/profile.ts) — name, roles, the `neofetch` readout, the about
  paragraphs, the `tree` skill groups, and contact links. Add LinkedIn and other links to the
  `contacts` array.
- [`app/data/projects.ts`](app/data/projects.ts) — one entry per project. Append a new object to
  `projects` and it appears in both the `ls -la` listing and as its own README panel.

Section order and window names are in [`app/components/windows.ts`](app/components/windows.ts).

## Project structure

```
app/
├── components/
│   ├── Chrome.tsx      title bar + tmux status bar, scroll tracking, keyboard nav
│   ├── Prompt.tsx      the `$ command` line that heads every section
│   ├── Section.tsx     shared section shell
│   ├── Hero.tsx  About.tsx  Work.tsx  Stack.tsx  Contact.tsx  Footer.tsx
│   └── windows.ts      the section/window list
├── data/
│   ├── profile.ts      everything about you
│   └── projects.ts     project entries
├── globals.css         palette, typography, CRT overlay, animations
├── layout.tsx
└── page.tsx
```

## Accessibility

Navigation is real anchor links, so it works without JavaScript. Keyboard shortcuts are an
enhancement on top. Focus is visible throughout, and `prefers-reduced-motion` disables the
type-on load sequence and smooth scrolling.

## Deploying

Any static-capable host works. The simplest is Vercel:

```bash
npx vercel
```
