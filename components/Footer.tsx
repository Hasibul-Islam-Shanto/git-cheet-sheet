'use client'

import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="text-center mt-[70px] pb-10 text-(--muted) font-mono text-[0.7rem] tracking-wider">
      <p>{t.footer}</p>
    </footer>
  )
}
