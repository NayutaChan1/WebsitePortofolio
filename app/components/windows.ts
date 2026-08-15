/** The page is one tmux session; each section is a window in it. */
export const windows = [
  { index: 0, id: "home", name: "home", path: "~" },
  { index: 1, id: "about", name: "about", path: "~/about" },
  { index: 2, id: "work", name: "work", path: "~/work" },
  { index: 3, id: "stack", name: "stack", path: "~/stack" },
  { index: 4, id: "contact", name: "contact", path: "~/contact" },
] as const;

export type WindowId = (typeof windows)[number]["id"];
