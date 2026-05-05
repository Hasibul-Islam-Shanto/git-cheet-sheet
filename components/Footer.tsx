'use client'

import { useTranslation } from '@/hooks/useTranslation'

const GITHUB_URL = 'https://github.com/Hasibul-Islam-Shanto'
const LINKEDIN_URL =
  'https://www.linkedin.com/in/md-hasibul-islam-shanto-80487a217'

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useTranslation()

  const linkWrapper =
    'inline-flex items-center gap-1.5 text-(--muted) hover:text-(--accent) transition-colors'
  const linkText =
    'underline decoration-(--border) underline-offset-4 hover:decoration-(--accent)'

  return (
    <footer className="text-center mt-[70px] pb-10 text-(--muted) font-mono text-[0.7rem] tracking-wider px-4">
      <p>{t.footer.tagline}</p>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-(--text)">
        <span>{t.footer.author}</span>
        <span className="text-(--border)" aria-hidden>
          ·
        </span>
        <a
          href={GITHUB_URL}
          className={linkWrapper}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={t.footer.githubAria}
        >
          <GitHubIcon />
          <span className={linkText}>{t.footer.github}</span>
        </a>
        <span className="text-(--border)" aria-hidden>
          ·
        </span>
        <a
          href={LINKEDIN_URL}
          className={linkWrapper}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={t.footer.linkedinAria}
        >
          <LinkedInIcon />
          <span className={linkText}>{t.footer.linkedin}</span>
        </a>
      </p>
    </footer>
  )
}
