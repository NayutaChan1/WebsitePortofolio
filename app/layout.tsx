import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Chrome from "./components/Chrome";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Rafael Febrian — full-stack and mobile developer working in TypeScript, Vue, Nest.js, Kotlin and Jetpack Compose, with a background in data and machine learning.";

export const metadata: Metadata = {
  title: "Rafael Febrian — Full-Stack Developer",
  description,
  openGraph: {
    title: "Rafael Febrian — Full-Stack Developer",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d2021",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <div className="crt" aria-hidden />
        <Chrome />
        <main className="flex-1 pt-11 pb-11">{children}</main>
      </body>
    </html>
  );
}
