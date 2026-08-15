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

export type Project = {
  slug: string;
  /** Directory name used in the `ls -la` listing. */
  dir: string;
  name: string;
  tagline: string;
  /** ls-style metadata. */
  perms: string;
  date: string;
  kind: string;
  tags: string[];
  context: string;
  overview: string[];
  features: { title: string; detail: string }[];
  stack: StackRow[];
  roadmap: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "flowbox-maximizer",
    dir: "flowbox-maximizer",
    name: "FlowBox MaXimizer",
    tagline:
      "Android planner that keeps Google Calendar and Outlook in sync, both ways.",
    perms: "drwxr-xr-x",
    date: "2025",
    kind: "android",
    tags: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "MVVM + Hilt",
      "Play Store",
    ],
    context:
      "BINUS University · TPA Mobile coursework · published on Google Play",
    overview: [
      "A native Android planner that merges your external calendars with your own tasks. Schedules pulled from Google Calendar and Microsoft Outlook land in the same timeline as the ones you create in the app, and anything you create locally is pushed back out to the provider it belongs to.",
      "The hard part is not the UI — it is keeping two remote calendars and one Firestore collection agreeing with each other without duplicating events. Each schedule carries the source id it came from, sync runs incrementally against a stored token, and an expired token falls back to a full resync instead of silently drifting.",
    ],
    features: [
      {
        title: "Two-way Google Calendar sync",
        detail:
          "Incremental sync driven by a syncToken kept in DataStore. Events flow Google → Firestore; local schedules without a googleSourceId are created upstream. An expired token (HTTP 410) triggers a full resync rather than a partial write, and cancelled events delete their local counterpart.",
      },
      {
        title: "Outlook sync over Microsoft Graph",
        detail:
          "Delta-link based incremental sync through Retrofit + Moshi, handling addedOrUpdated and deletedIds as separate paths so removals are not lost between deltas.",
      },
      {
        title: "Three auth providers, one session",
        detail:
          "Firebase email/password, Google Sign-In (which doubles as the Calendar consent gate), and MSAL for Microsoft — including silent login from the token cache. The session persists in DataStore and skips straight to Home on return.",
      },
      {
        title: "Dashboard with real progress",
        detail:
          "Circular completion ring for the day plus All / Ongoing / Complete filters derived from endTime against the current clock, so state is computed rather than stored and cannot go stale.",
      },
      {
        title: "Schedule → Task → SubTask",
        detail:
          "A three-level hierarchy, each level independently completable. Detail screens allow inline editing of title, description, date and time range, and full subtask management.",
      },
      {
        title: "Unified calendar view",
        detail:
          "A horizontal date strip over a merged day view that renders Firestore, Google and Outlook events together, with past and upcoming events visually separated.",
      },
      {
        title: "Focus timer",
        detail:
          "A Pomodoro-style countdown with play, pause and reset, and a task list you can edit inline while the clock runs.",
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
      { layer: "Auth", tech: "Firebase Auth · Google Sign-In · MSAL (Azure)" },
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
      "Free-slot search behind the Find Free Time sheet — the UI and inputs are in place, the interval algorithm is next.",
      "Wire the focus timer to live Firestore tasks instead of its in-memory list.",
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
