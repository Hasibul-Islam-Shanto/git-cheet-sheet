import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { HtmlLangSync } from "@/components/ui/HtmlLangSync";

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bangla',
})

const siteUrl = "https://git-sheet.hi-shanto.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "hi-git — Git Cheat Sheet for Developers",
    template: "%s | hi-git",
  },

  description:
    "A fast, searchable Git & GitHub reference for beginner and intermediate developers. Every command with real examples, syntax highlighting, and GitHub workflow.",

  keywords: [
    "git",
    "github",
    "git cheat sheet",
    "git commands",
    "git reference",
    "git tutorial",
    "git for beginners",
    "github workflow",
    "git branch",
    "git commit",
    "git reset",
    "git rebase",
    "git stash",
    "git reflog",
  ],

  authors: [{ name: "hi-git", url: siteUrl }],
  creator: "hi-git",

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "hi-git",
    title: "hi-git — Git, made human.",
    description:
      "Searchable Git cheat sheet with real examples. Every command explained simply for beginner and intermediate developers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "hi-git — Git Cheat Sheet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "hi-git — Git, made human.",
    description:
      "Searchable Git cheat sheet with real examples for beginner and intermediate developers.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hindSiliguri.variable}>
      <body>
        <HtmlLangSync />
        {children}
      </body>
    </html>
  );
}
