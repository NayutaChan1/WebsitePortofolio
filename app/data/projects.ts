export type ProjectLink = {
  label: string;
  href: string;
  /** Shown as the command that "opens" the link. */
  cmd: string;
};

export type StackRow = {
  layer: string;
  tech: string;
};

/**
 * Drop image files in `public/projects/<slug>/` and point `src` at them,
 * for example "/projects/rumipang/customer_menu.png".
 * Leave `src` empty to render a placeholder frame instead.
 */
export type Screenshot = {
  src: string;
  alt: string;
  /** Printed under the frame, like a file name in a listing. */
  caption: string;
  /** "phone" gets a tall 9:20 frame in a narrow grid. Defaults to "wide". */
  shape?: "phone" | "wide";
};

export type Project = {
  /** Anchor id used by the listing link. */
  slug: string;
  /** Directory name used in the `ls` listing. */
  dir: string;
  name: string;
  tagline: string;
  tags: string[];
  context: string;
  overview: string[];
  screenshots?: Screenshot[];
  /** A walkthrough video. The poster is stored locally, see VideoEmbed. */
  video?: {
    /** The id after youtu.be/ in the share link. */
    youtube: string;
    title: string;
    poster: string;
  };
  features: { title: string; detail: string }[];
  stack: StackRow[];
  roadmap: string[];
  links: ProjectLink[];
};

/** Newest first. The `ls` listing sorts these by name on its own. */
export const projects: Project[] = [
  {
    slug: "rumipang",
    dir: "rumipang",
    name: "Rumipang Ordering System",
    tagline:
      "QR ordering for a warung, from the customer's phone to a thermal receipt.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Flutter",
      "Midtrans QRIS",
      "In production",
    ],
    context:
      "Web + Android · 2026 · team of 2 · live in a warung, moving real money through QRIS",
    overview: [
      "One system with two faces. Customers scan a single QR, choose a table or take away, order, and pay with cash or QRIS. Staff work from a web dashboard and from a Flutter cashier app on an Android tablet, which doubles as the bridge to a Bluetooth thermal printer.",
      "Rumipang is a working warung, not a case study. The system has been taking its orders and its money since August 2026, and most of what sits in it now exists because someone behind the counter asked for it: a second printer so the kitchen gets its own copy, staff meal tracking because the crew eats from the same menu, a daily expenses page so the recap nets out, and a Take Away option that had to be told apart from a table nobody had chosen yet.",
      "It all runs from one Next.js repo: App Router pages for both customer and staff, API routes as the backend, Supabase for database, auth, realtime and storage. Midtrans settles QRIS, and a receipt reaches the printer the moment an order becomes paid.",
    ],
    // Files live in public/projects/rumipang/. Two more are sitting there
    // unused, date_picker.jpg and category_add.jpg; add them here to show them.
    screenshots: [
      {
        src: "/projects/rumipang/order.jpg",
        alt: "Taking an order, with menu search and a running cart",
        caption: "order.jpg",
        shape: "phone",
      },
      {
        src: "/projects/rumipang/history.jpg",
        alt: "History for one day with its revenue recap",
        caption: "history.jpg",
        shape: "phone",
      },
      {
        src: "/projects/rumipang/menu.jpg",
        alt: "Menu management grouped by category",
        caption: "menu.jpg",
        shape: "phone",
      },
      {
        src: "/projects/rumipang/menu_add.jpg",
        alt: "Adding a menu item, with a photo that can be cropped",
        caption: "menu_add.jpg",
        shape: "phone",
      },
      {
        src: "/projects/rumipang/admin_sheet.jpg",
        alt: "Admin sheet: stock, reports, staff meals, theme and printer",
        caption: "admin_sheet.jpg",
        shape: "phone",
      },
    ],
    features: [
      {
        title: "A payment safety net written after losing money",
        detail:
          "Two QRIS payments worth Rp 107.000 settled at Midtrans and never became orders: the checkout tab died on redirect and the webhook was not configured. The fix depends on neither. A reconcile endpoint asks Midtrans directly about every pending intent, skips anything younger than a minute, refuses to expire an intent while Midtrans is unreachable, and closes only what is genuinely stale after a day.",
      },
      {
        title: "Settlement that two callers can race safely",
        detail:
          "Polling and the webhook both settle payments on purpose, and each verifies with Midtrans rather than trusting the notification. A conditional lock from PENDING to PAID makes settlement idempotent, so whichever arrives first produces exactly one order and exactly one receipt.",
      },
      {
        title: "Receipts that cannot print twice",
        detail:
          "A unique index per order and station blocks duplicates at the database, and any job the tablet fails to acknowledge within two minutes returns to the queue. One order becomes one job per station, so a failure at the kitchen printer never reprints the copy the cashier is already holding.",
      },
      {
        title: "Two printers over one Bluetooth socket",
        detail:
          "The SPP library holds a single global socket, so the tablet serves stations in turn: connect, drain that queue, acknowledge, then switch. Job claiming is filtered by station, otherwise the device holding the cashier printer would lock a kitchen job it has no way to print and strand it for two minutes.",
      },
      {
        title: "Kitchen status and money status stay apart",
        detail:
          "status follows the kitchen (QUEUED, PROCESSING, SERVED) while payment_status follows the money. Neither is inferred from the other, which is exactly what lets a served order still be waiting to be paid.",
      },
      {
        title: "QRIS archives itself, cash does not",
        detail:
          "QRIS money arrives before the order exists, so those orders move to history on their own. Cash still has counting and change happening in the room, and only the cashier knows when that is finished, so cash keeps its button. The rule lives in one file, so the three call sites cannot let it drift apart.",
      },
      {
        title: "Cost snapshots instead of references",
        detail:
          "Every sold item and staff meal stores the cost price as it was at the moment of the transaction. Referencing the live cost price instead would quietly rewrite last month's profit every time a supplier raised a price.",
      },
      {
        title: "A cashier app that survives a bad network",
        detail:
          "Flutter, MVVM with repositories, adaptive from a 6 inch phone to a 10 inch tablet. Actions taken offline queue locally, and money is never marked paid optimistically: an order stays visibly unpaid until the server confirms it.",
      },
    ],
    stack: [
      {
        layer: "Web",
        tech: "Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4",
      },
      {
        layer: "Cashier app",
        tech: "Flutter 3.44 · Dart 3.12 · MVVM + repositories",
      },
      { layer: "Database", tech: "Supabase (PostgreSQL + Storage)" },
      {
        layer: "Auth",
        tech: "Supabase Auth, validated on the server on every request",
      },
      {
        layer: "Realtime",
        tech: "Supabase Realtime, with a 15 second polling fallback",
      },
      {
        layer: "Payments",
        tech: "Midtrans Snap (QRIS) · polling + webhook + reconcile sweep",
      },
      {
        layer: "Printing",
        tech: "Bluetooth SPP · ESC/POS · 32 column receipts, two stations",
      },
      { layer: "Deploy", tech: "Vercel · Docker image (output standalone)" },
    ],
    roadmap: [
      "Work through the checklist that still needs the physical tablet and printer: behaviour after a forced close mid print, paper running out, and a busy queue across both stations.",
      "Remove the Mayar payment provider still sitting in the repo but never called, so there is exactly one payment path to reason about.",
      "Recipes per menu item, so a sale decreases ingredient stock instead of waiting for a manual adjustment.",
    ],
    links: [
      {
        label: "rumipang.vercel.app",
        href: "https://rumipang.vercel.app",
        cmd: "open",
      },
      {
        label: "Web and API on GitHub",
        href: "https://github.com/RickyRudiansyah/Warkop_v",
        cmd: "git clone",
      },
      {
        label: "Cashier app on GitHub",
        href: "https://github.com/RickyRudiansyah/RumipangApp",
        cmd: "git clone",
      },
      {
        label: "instagram.com/rumipang.id",
        href: "https://www.instagram.com/rumipang.id",
        cmd: "open",
      },
    ],
  },
  {
    slug: "mosec",
    dir: "mosec",
    name: "MoSec",
    tagline:
      "Lab monitoring for a campus, from the reed switch on the door to the dashboard that raises the alarm.",
    tags: ["Nuxt 4", "ESP32", "FastAPI", "Tauri", "PostgreSQL", "IoT"],
    context:
      "Web + IoT + Desktop · 2026 · team of 3 · built for the teaching labs at BINUS University",
    overview: [
      "Teaching labs get left unlocked and projectors get left running, and nobody finds out until someone happens to walk past. MoSec watches both with ESP32 sensors on the door and the projector, then checks what it sees against the room borrowing records from the campus system. A room reading unlocked while nobody has booked it stops being a sensor reading and becomes an incident.",
      "That cross reference is the whole idea. Unlocked means nothing on its own; it is completely normal while a class is in there. The system only earns its keep once physical state and the booking calendar are held side by side, which is why four programs in four languages have to agree with each other: Arduino firmware on the ESP32s, a Nuxt dashboard on PostgreSQL, a FastAPI service that builds briefing decks, and a Tauri kiosk in Rust that talks to the card reader over serial.",
    ],
    video: {
      youtube: "_xJTJ5Oh5Cg",
      title: "MoSec demo",
      poster: "/projects/mosec/demo_poster.jpg",
    },
    // Files live in public/projects/mosec/. Seven more sit there unused:
    // active_labs, lab_grid, warnings_empty, kiosk_idle, reports, settings and
    // architecture_slide. Add an entry here to show any of them.
    screenshots: [
      {
        src: "/projects/mosec/dashboard.jpg",
        alt: "Global overview with active labs, warnings and projector uptime",
        caption: "dashboard.jpg",
      },
      {
        src: "/projects/mosec/room_detail.jpg",
        alt: "One lab: door state, projector state and incidents this month",
        caption: "room_detail.jpg",
      },
      {
        src: "/projects/mosec/incidents.jpg",
        alt: "Rooms unlocked while not borrowed, live and by month",
        caption: "incidents.jpg",
      },
      {
        src: "/projects/mosec/projector.jpg",
        alt: "Projector uptime broken down by shift for a chosen day",
        caption: "projector.jpg",
      },
      {
        src: "/projects/mosec/kiosk.jpg",
        alt: "Desktop kiosk after a card tap, ready to build the briefing deck",
        caption: "kiosk.jpg",
      },
      {
        src: "/projects/mosec/door_sensor.png",
        alt: "How the reed switch reads the door as locked or unlocked",
        caption: "door_sensor.png",
      },
    ],
    features: [
      {
        title: "A reading is not an incident",
        detail:
          "The door sensor only knows open or closed. Whether that matters depends on who booked the room, so every state is resolved against today's active borrowings before it becomes Active, Warning or Inactive. Skip that step and the dashboard raises an alarm through every scheduled class.",
      },
      {
        title: "Projector sessions, not projector samples",
        detail:
          "The light sensor reports continuously, but nobody wants a stream of lux values. They want to know how long the projector was on. Crossing the threshold opens or closes a session row instead, so uptime and the power estimate are a sum over real intervals rather than a count of samples.",
      },
      {
        title: "A fake sensor that is not a mock",
        detail:
          "Hardware is not always in hand, so a dummy sender posts to the real endpoints with the real payloads and fills the real tables. The dashboard reads genuine rows from PostgreSQL and cannot tell the difference. It also became the reference implementation the firmware is checked against.",
      },
      {
        title: "Incident rate that survives retuning",
        detail:
          "The simulator is configured in incidents per day across the whole building, then converted into a per tick probability. Change the tick interval or add rooms and the rate still means what it says, which a hardcoded chance per tick would not.",
      },
      {
        title: "ESP32 firmware on enterprise WiFi",
        detail:
          "Reed switch for the door, light sensor for the projector, MFRC522 for the card reader, all joining WPA2 Enterprise rather than the home network every ESP32 tutorial assumes. Credentials live in a secrets header copied from an example and kept out of the repo.",
      },
      {
        title: "Briefing decks built from the live schedule",
        detail:
          "The FastAPI service pulls the teaching schedule and course data from the campus APIs, works out which session is running, fills the PowerPoint templates and injects QR codes. What an assistant used to assemble by hand before every class comes back as one response.",
      },
      {
        title: "Tap a card, get your deck",
        detail:
          "A Tauri kiosk reads the NFC reader over USB serial from Rust, identifies the assistant and room from the card, and drives the same briefing service the web app uses. Tapping in and getting the deck become the same action.",
      },
      {
        title: "Testable even though it depends on the clock",
        detail:
          "Resolving a class from the wall clock makes a service untestable outside the exact hour a class runs. Switches let it read from either live API or an offline schedule file, and let it pretend now is any given moment, so last Tuesday's deck can be reproduced this afternoon.",
      },
    ],
    stack: [
      { layer: "Web", tech: "Nuxt 4 · Vue 3 · Nitro server routes" },
      { layer: "Database", tech: "PostgreSQL 16 · Drizzle ORM" },
      {
        layer: "IoT",
        tech: "ESP32 in Arduino C++ · reed switch · light sensor · MFRC522 NFC",
      },
      { layer: "Network", tech: "WPA2 Enterprise campus WiFi" },
      {
        layer: "Briefing service",
        tech: "Python · FastAPI · pptx generation · qrcode · httpx",
      },
      { layer: "Desktop", tech: "Tauri · Rust · Vue · Vite" },
      { layer: "External", tech: "Campus Messier and Bluejack APIs" },
      { layer: "Infra", tech: "Docker Compose · schema push and seeding" },
    ],
    roadmap: [
      "Move the kiosk backend address out of the source. It is baked into the executable at build time, so an installer handed to another machine only works while the server keeps one exact LAN address.",
      "Align the firmware payloads with the API contracts before real hardware goes in. The dummy sender already speaks them correctly and is the reference.",
      "Excel and PDF export on the reports page, and room numbers instead of raw ids in the report table.",
    ],
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/NayutaChan1/RIG_Even2025-2026",
        cmd: "git clone",
      },
    ],
  },
  {
    slug: "flowbox",
    dir: "flowbox_maximizer",
    name: "FlowBox MaXimizer",
    tagline:
      "Android planner that keeps Google Calendar and Outlook in sync, both ways.",
    tags: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "MVVM + Hilt",
      "Play Store",
    ],
    context:
      "Android · 2025 · team of 2 · BINUS TPA Mobile coursework · published on Google Play",
    overview: [
      "A native Android planner that merges your external calendars with your own tasks. Schedules pulled from Google Calendar and Microsoft Outlook land in the same timeline as the ones you create in the app, and anything you create locally is pushed back out to the provider it belongs to.",
      "The hard part is not the UI. It is keeping two remote calendars and one Firestore collection agreeing with each other without duplicating events. Each schedule carries the source id it came from, sync runs incrementally against a stored token, and an expired token falls back to a full resync instead of silently drifting.",
    ],
    features: [
      {
        title: "Google Calendar sync, both ways",
        detail:
          "Incremental sync driven by a syncToken kept in DataStore. Events flow Google → Firestore; local schedules without a googleSourceId are created upstream. An expired token (HTTP 410) triggers a full resync rather than a partial write, and cancelled events delete their local counterpart.",
      },
      {
        title: "Outlook sync over Microsoft Graph",
        detail:
          "Delta link based incremental sync through Retrofit + Moshi, handling addedOrUpdated and deletedIds as separate paths so removals are not lost between deltas.",
      },
      {
        title: "Three auth providers, one session",
        detail:
          "Firebase email/password, Google sign in (which doubles as the Calendar consent gate), and MSAL for Microsoft, including silent login from the token cache. The session persists in DataStore and skips straight to Home on return.",
      },
      {
        title: "Dashboard with real progress",
        detail:
          "Circular completion ring for the day plus All / Ongoing / Complete filters derived from endTime against the current clock, so state is computed rather than stored and cannot go stale.",
      },
      {
        title: "Schedule → Task → SubTask",
        detail:
          "A hierarchy three levels deep, each level independently completable. Detail screens allow inline editing of title, description, date and time range, and full subtask management.",
      },
      {
        title: "Unified calendar view",
        detail:
          "A horizontal date strip over a merged day view that renders Firestore, Google and Outlook events together, with past and upcoming events visually separated.",
      },
      {
        title: "Focus timer",
        detail:
          "A Pomodoro style countdown with play, pause and reset, and a task list you can edit inline while the clock runs.",
      },
      {
        title: "Local notifications",
        detail:
          "Schedule reminders delivered through a dedicated notification channel.",
      },
    ],
    stack: [
      {
        layer: "UI",
        tech: "Jetpack Compose · Material 3 · Navigation Compose",
      },
      {
        layer: "Architecture",
        tech: "MVVM + Repository, split into core/ and features/",
      },
      { layer: "DI", tech: "Hilt (Dagger)" },
      { layer: "Auth", tech: "Firebase Auth · Google sign in · MSAL (Azure)" },
      { layer: "Database", tech: "Cloud Firestore + Realtime Database" },
      {
        layer: "Local storage",
        tech: "Jetpack DataStore (preferences, sync tokens)",
      },
      {
        layer: "Networking",
        tech: "Google Calendar API v3 · Microsoft Graph · Retrofit · Moshi · OkHttp",
      },
      { layer: "Platform", tech: "minSdk 35 / targetSdk 35" },
      {
        layer: "Secrets",
        tech: "env.properties → BuildConfig, nothing hardcoded",
      },
    ],
    roadmap: [
      "Free slot search behind the Find Free Time sheet. The UI and inputs are in place; the interval algorithm is next.",
      "Wire the focus timer to live Firestore tasks instead of its in memory list.",
      "Collapse the duplicate Task / SubTask models into one, and cover the sync layer with unit tests.",
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=edu.bluejack25_1.FlowBoxMaXimizer",
        cmd: "open",
      },
      {
        label: "Source on GitHub",
        href: "https://github.com/NayutaChan1/MOBILE-MX-FB-251",
        cmd: "git clone",
      },
    ],
  },
];
