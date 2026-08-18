/**
 * Everything about you lives here. Edit this file, not the components.
 */

export const profile = {
  handle: "rafael",
  host: "portfolio",
  name: "Rafael Febrian",
  roles: ["full stack developer", "mobile engineer", "data & machine learning"],
  location: "Jakarta, Indonesia",
  school: "Computer Science at BINUS University",
  job: "Laboratory Assistant at BINUS SLC",
  /**
   * Portrait shown in the About section. Save the file into `public/` with one
   * of these names; the first one that exists wins. Until then the section
   * falls back to the ASCII monogram, the same way neofetch falls back when no
   * image backend is available.
   */
  avatarNames: ["rafael.jpg", "rafael.jpeg", "rafael.png", "rafael.webp"],
  avatarAlt: "Rafael Febrian",
  /** Shown as the neofetch style readout in the About section. */
  fetch: [
    { key: "Host", value: "BINUS University, Computer Science" },
    { key: "Role", value: "Laboratory Assistant at BINUS SLC (full time)" },
    {
      key: "Uptime",
      value: "Two full schedules in parallel: working and studying",
    },
    { key: "Focus", value: "Full stack web · Mobile · Data & ML" },
    { key: "Languages", value: "TypeScript · Kotlin · Java · Python · C#" },
    {
      key: "Recent",
      value: "Vue · Nest.js · Power BI · Refactoring (Dec 2025)",
    },
    { key: "Cloud", value: "Docker · Kubernetes · Terraform · Azure" },
    { key: "Location", value: "Jakarta, Indonesia" },
    {
      key: "Currently",
      value: "Running Rumipang in production · occasional CTFs",
    },
  ],
  about: [
    "I am a Computer Science student at BINUS University and a full time laboratory assistant at the Software Laboratory Center. That is two full schedules running at once: lab shifts and teaching practicum classes on one side, my own coursework on the other. Everything I build has to fit in what is left over, which has made me ruthless about planning in blocks, cutting scope before I start instead of halfway through, and finishing one thing rather than collecting five unfinished repositories.",
    "Teaching turned out to be the other half of that. Explaining something to a room of students is the fastest way I know to find the holes in my own understanding, and it is where I learned to say a thing plainly before writing it down.",
    "What I build has to survive contact with real data: payments that must not go missing, calendars that sync two ways, auth that spans three providers, state that stays correct when the network does not.",
    "The work has been deliberately wide. Vue and Nest.js on the web, Kotlin and Compose on Android, SQL Server and PySpark on the data side, Docker and Terraform around all of it. What ties it together is that I like the parts people skip, like schema design, refactoring, and working out which assumption a system forgot to check.",
  ],
} as const;

/** A leaf in the skill tree. Objects are for skills picked up most recently. */
export type StackItem = string | { name: string; recent: true };

export type StackGroup = {
  dir: string;
  items: StackItem[];
};

/** Framing line printed above the tree. It is what makes the list mean something. */
export const stackNote =
  "most of this is not only used but taught: an assistant at BINUS SLC has to qualify in a subject before being allowed to lead its practicum class";

export const recentNote = "picked up most recently, Dec 2025";

/** Rendered as `tree ~/stack/*`. Order is the order it prints. */
export const stack: StackGroup[] = [
  {
    dir: "languages",
    items: [
      { name: "typescript", recent: true },
      "javascript",
      "java",
      "kotlin",
      "python",
      "php",
      "c#",
      "c",
      "rust",
      "sql",
    ],
  },
  {
    dir: "web",
    items: [
      { name: "vue.js", recent: true },
      "nuxt.js",
      "react.js",
      "next.js",
      { name: "nest.js", recent: true },
      "express.js",
      "fastapi",
      "three.js",
      "jquery",
      "bootstrap",
      "html",
      "css",
    ],
  },
  {
    dir: "mobile",
    items: [
      "android",
      "kotlin · jetpack compose",
      "flutter · riverpod",
      "firebase",
      "ios",
    ],
  },
  {
    dir: "desktop",
    items: ["tauri · rust", ".net", "javafx", "java swing", "unity"],
  },
  {
    dir: "iot",
    items: [
      "esp32 · arduino",
      "reed switch · light sensors",
      "mfrc522 nfc",
      "wpa2 enterprise",
    ],
  },
  {
    dir: "databases",
    items: [
      "sql server",
      "supabase · postgresql",
      "erd modeling",
      "database normalization",
      "oltp / olap",
      "etl dimension",
      "pyspark",
      "cloudera",
    ],
  },
  {
    dir: "ai",
    items: [
      "machine learning",
      "deep learning",
      "nlp essentials",
      "cv2 / opencv",
      "bio python",
      "ai prompting",
    ],
  },
  {
    dir: "analytics",
    items: [
      { name: "power bi", recent: true },
      "predictive analytics",
      "decision analytics",
      "rapid miner",
      "r studio",
      "python power electronics",
      "excel",
    ],
  },
  {
    dir: "cloud",
    items: [
      "docker",
      "kubernetes",
      "terraform",
      { name: "azure · azure portal", recent: true },
      "vercel",
      "virtual machine",
    ],
  },
  {
    dir: "networking",
    items: ["cisco", "mikrotik", "crimping"],
  },
  {
    dir: "gis",
    items: ["arcgis", "qgis"],
  },
  {
    dir: "design",
    items: ["figma", "axure", "adobe photoshop", "uml"],
  },
  {
    dir: "practices",
    items: [
      "oop",
      "design patterns",
      "ddd pattern",
      "data structures",
      { name: "code refactoring", recent: true },
    ],
  },
];

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  /** Terminal style verb shown next to the row. */
  cmd: string;
};

export const contacts: ContactLink[] = [
  {
    label: "email",
    value: "rf05022006@gmail.com",
    href: "mailto:rf05022006@gmail.com",
    cmd: "mail",
  },
  {
    label: "github",
    value: "github.com/NayutaChan1",
    href: "https://github.com/NayutaChan1",
    cmd: "git remote",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/rafael-febrian-1086b433b",
    href: "https://www.linkedin.com/in/rafael-febrian-1086b433b",
    cmd: "open",
  },
];
