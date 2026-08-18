import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "./data/profile";
import { windows } from "./components/windows";

export const alt = `${profile.name}, ${profile.roles.join(" · ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#1d2021",
  surface: "#282828",
  line: "#3c3836",
  fg: "#ebdbb2",
  muted: "#a89984",
  dim: "#7c6f64",
  accent: "#fe8019",
  aqua: "#8ec07c",
  blue: "#83a598",
  purple: "#d3869b",
  red: "#fb4934",
  yellow: "#fabd2f",
};

const ROLE_COLOR = [C.accent, C.aqua, C.purple];

function font(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "assets", "fonts", file));
}

/**
 * The card people see when this link is pasted into LinkedIn or a chat.
 * It is the same tmux window as the page itself, held still.
 */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: C.bg,
        fontFamily: "JetBrains Mono",
        color: C.fg,
      }}
    >
      {/* title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 64,
          paddingLeft: 32,
          paddingRight: 32,
          backgroundColor: C.surface,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {[C.red, C.yellow, C.aqua].map((c) => (
            <div
              key={c}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: c,
                marginRight: 10,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", marginLeft: 14, fontSize: 20 }}>
          <span style={{ color: C.aqua }}>
            {profile.handle}@{profile.host}
          </span>
          <span style={{ color: C.dim }}>:</span>
          <span style={{ color: C.blue }}>~</span>
          <span style={{ color: C.dim }}>&nbsp;·&nbsp;tmux</span>
        </div>
      </div>

      {/* body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingLeft: 64,
          paddingRight: 64,
          paddingTop: 56,
        }}
      >
        <div style={{ display: "flex", fontSize: 26 }}>
          <span style={{ color: C.aqua }}>~</span>
          <span style={{ color: C.accent }}>&nbsp;$&nbsp;</span>
          <span style={{ color: C.fg }}>whoami</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            marginTop: 26,
            color: C.fg,
          }}
        >
          {profile.name}
        </div>

        <div style={{ display: "flex", marginTop: 34 }}>
          <div
            style={{ display: "flex", width: 4, backgroundColor: C.accent }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 22,
            }}
          >
            <div style={{ display: "flex", fontSize: 24 }}>
              {profile.roles.map((role, i) => (
                <div key={role} style={{ display: "flex" }}>
                  {i > 0 && (
                    <span style={{ color: C.line }}>&nbsp;·&nbsp;</span>
                  )}
                  <span style={{ color: ROLE_COLOR[i % ROLE_COLOR.length] }}>
                    {role}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontSize: 22,
                color: C.muted,
              }}
            >
              {profile.school} · {profile.job}
            </div>
          </div>
        </div>
      </div>

      {/* tmux status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 60,
          paddingLeft: 32,
          paddingRight: 32,
          backgroundColor: C.surface,
          borderTop: `1px solid ${C.line}`,
          fontSize: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: C.accent,
            color: C.bg,
            fontWeight: 700,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 4,
            paddingBottom: 4,
            marginRight: 16,
          }}
        >
          {profile.handle}
        </div>
        {windows.map((w) => (
          <div
            key={w.id}
            style={{
              display: "flex",
              marginRight: 18,
              color: w.index === 0 ? C.bg : C.muted,
              backgroundColor: w.index === 0 ? C.fg : "transparent",
              fontWeight: w.index === 0 ? 700 : 400,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {w.index}:{w.name}
            {w.index === 0 ? "*" : ""}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: font("JetBrainsMono-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: font("JetBrainsMono-Bold.ttf"),
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
