# Rafael Febrian, Personal Portfolio

Personal portfolio site. The whole page is styled as a single **tmux session**: each section is a
window, the status bar at the bottom is the navigation, and every section opens with the shell
command that produced it (`whoami`, `neofetch`, `ls`, `tree`, `cat`).

Copy on the site deliberately avoids hyphens and dashes, so prefer commas, colons or `·` when
editing the data files.

## Live demo

Not deployed yet. See [Deploying](#deploying).

## Sections

| Window | Section | Command |
| --- | --- | --- |
| 0 | Home | `whoami` |
| 1 | About | `neofetch` · `cat about.txt` |
| 2 | Work | `ls ~/work` · `cat <project>/README.md` |
| 3 | Stack | `tree ~/stack/*` |
| 4 | Contact | `cat contact.txt` |

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `0` to `4` | Jump to a window |
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
  `projects` and it appears in both the `ls` listing and as its own README panel. Keep the array
  newest first; the listing sorts itself by name.

### Your portrait

Save the photo into `public/` as `rafael.jpg` (`.jpeg`, `.png` and `.webp` also work). The About
section picks it up on its own, no code change needed. With no such file there, the block prints
the ASCII monogram instead, the same way neofetch falls back when it has no image backend.

The lookup runs at build time, so a running `npm run dev` needs a restart to notice a newly saved
file. `npm run build` always sees it.

Any aspect ratio works; the frame is square and the image is cropped to fill it, so a portrait
crop looks best.

### Your CV

Save it into `public/` as `resume.pdf` (or `cv.pdf`). A `$ wget resume.pdf` button appears at the
top of the Contact section on its own, and with no such file there the button is not rendered at
all, so the page never offers a download that 404s.

Like the portrait, the lookup runs at build time, so restart `npm run dev` after adding the file.

### The link preview card

[`app/opengraph-image.tsx`](app/opengraph-image.tsx) draws the 1200x630 image that LinkedIn,
WhatsApp and X show when the link is shared. It renders the same tmux window as the page, pulling
the name, roles and school straight from `profile.ts`, so it cannot drift out of date. Preview it
at <http://localhost:3000/opengraph-image>.

The fonts come from [`assets/fonts/`](assets/fonts) rather than the network, so the build does not
depend on Google Fonts being reachable.

**Set the site URL after deploying.** Absolute URLs are required in preview cards. On Vercel the
production host is filled in automatically; once a custom domain is attached, set
`NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the project's environment variables and redeploy,
otherwise shared links point at the vercel.app host.

### Adding a demo video

Give a project a `video` and a "demo" block appears above its screenshots:

```ts
video: {
  youtube: "_xJTJ5Oh5Cg",              // the id after youtu.be/
  title: "MoSec demo",
  poster: "/projects/mosec/demo_poster.jpg",
},
```

Save the poster locally rather than hotlinking it. The page then loads nothing from YouTube until
someone presses play, which keeps the first paint fast and makes no third party request for
visitors who never watch. To grab the poster for a video id:

```bash
curl -o public/projects/<slug>/demo_poster.jpg https://i.ytimg.com/vi/<id>/maxresdefault.jpg
```

Hosting the file yourself instead of on YouTube also works, but a video in `public/` is served on
every view and counts against the deploy's bandwidth, so keep that for short silent loops and leave
long walkthroughs on YouTube.

### Adding screenshots

Each project may carry a `screenshots` array. Put the image files in
`public/projects/<slug>/`, then point `src` at the public path:

```ts
screenshots: [
  {
    src: "/projects/rumipang/order.jpg",
    alt: "Taking an order, with menu search and a running cart",
    caption: "order.jpg",
    shape: "phone",
  },
],
```

`shape: "phone"` gives a tall 9:20 frame and lays the set out in a narrow grid, up to five across.
Leave `shape` off for browser or tablet captures and they get a 16:10 frame, two across. Images are
contained rather than cropped, so nothing is cut off either way.

An empty `src` renders a placeholder frame labelled with its `alt`, so a project can declare the
screens it wants before the images exist.

Use file names without spaces or brackets. They end up in URLs, and the caption under each frame is
just the file name.

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
