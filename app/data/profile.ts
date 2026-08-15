/**
 * Everything about you lives here. Edit this file, not the components.
 */

export const profile = {
  handle: "rafael",
  host: "portfolio",
  name: "Rafael Febrian",
  roles: ["full-stack developer", "mobile engineer", "data & machine learning"],
  location: "Jakarta, Indonesia",
  school: "BINUS University — Computer Science",
  /** Shown as the neofetch-style readout in the About section. */
  fetch: [
    { key: "Host", value: "BINUS University — Computer Science" },
    { key: "Focus", value: "Full-stack web · Mobile · Data & ML" },
    { key: "Languages", value: "TypeScript · Kotlin · Java · Python · C#" },
    {
      key: "Recent",
      value: "Vue · Nest.js · Power BI · Refactoring (Dec 2025)",
    },
    { key: "Cloud", value: "Docker · Kubernetes · Terraform · Azure" },
    { key: "Location", value: "Jakarta, Indonesia" },
    { key: "Currently", value: "Shipping FlowBox MaXimizer · occasional CTFs" },
  ],
  about: [
    "I build things that have to survive contact with real data — calendars that sync two ways, auth that spans three providers, state that stays correct when the network does not.",
    "My work has been deliberately wide: Vue and Nest.js on the web, Kotlin and Compose on Android, SQL Server and PySpark on the data side, Docker and Terraform around all of it. The through-line is that I like the parts people skip — schema design, refactoring, and working out which assumption a system forgot to check.",
  ],
} as const;

/** A leaf in the skill tree. Objects are for skills picked up most recently. */
export type StackItem = string | { name: string; recent: true };

export type StackGroup = {
  dir: string;
  items: StackItem[];
};

export const recentNote = "picked up most recently — Dec 2025";

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
      "sql",
    ],
  },
  {
    dir: "web",
    items: [
      { name: "vue.js", recent: true },
      "react.js",
      { name: "nest.js", recent: true },
      "express.js",
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
      "firebase",
      "flutter",
      "ios",
    ],
  },
  {
    dir: "desktop-and-game",
    items: [".net", "javafx", "java swing", "unity"],
  },
  {
    dir: "data-and-databases",
    items: [
      "sql server",
      "erd modeling",
      "database normalization",
      "oltp / olap",
      "etl dimension",
      "pyspark",
      "cloudera",
    ],
  },
  {
    dir: "ai-and-analytics",
    items: [
      "machine learning",
      "deep learning",
      "nlp essentials",
      "cv2 / opencv",
      "bio python",
      "python power electronics",
      "r studio",
      "rapid miner",
      "predictive analytics",
      "decision analytics",
      { name: "power bi", recent: true },
      "excel",
      "ai prompting",
    ],
  },
  {
    dir: "cloud-and-devops",
    items: [
      "docker",
      "kubernetes",
      "terraform",
      { name: "azure · azure portal", recent: true },
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
    dir: "design-and-modeling",
    items: ["figma", "axure", "adobe photoshop", "uml"],
  },
  {
    dir: "engineering-practice",
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
  /** Terminal-flavoured verb shown next to the row. */
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
  // Add LinkedIn / X / blog here when you have the URLs:
  // { label: "linkedin", value: "linkedin.com/in/…", href: "https://…", cmd: "open" },
];
