"use client";

import { useTranslation } from "@/hooks/useTranslation";
import SearchBar from "@/components/search/SearchBar";

export default function Hero() {
  const { t } = useTranslation();

  const words = t.hero.title.split(" ");
  const accentWord = words[words.length - 1];
  const beforeAccent = words.slice(0, -1).join(" ");

  return (
    <header className="w-full px-6 pt-5 pb-4 relative overflow-hidden">
      <div className="relative z-10 text-center">
        <div className="inline-block bg-[rgba(247,201,72,0.10)] border border-[rgba(247,201,72,0.25)] text-(--accent) font-mono text-[0.62rem] tracking-[0.18em] px-[13px] py-[4px] rounded-full mb-6 uppercase">
          {t.hero.badge}
        </div>

        <h1 className="text-[clamp(2.5rem,5.2vw,6rem)] font-extrabold font-mono leading-[1.05] -tracking-widest mb-8">
          {beforeAccent} <span className="text-(--accent)">{accentWord}</span>
          <br />
          {t.hero.titleHighlight}
        </h1>

        <div className="max-w-[560px] mx-auto">
          <p className="text-(--muted) text-[0.83rem] leading-[1.7]">
            {t.hero.description}
          </p>

          <p className="text-(--muted) mt-[10px] text-[0.72rem] font-mono tracking-[0.04em]">
            {t.hero.subtitle}
          </p>

          <div className="mt-6">
            <SearchBar />
          </div>

          <div className="w-9 h-[2px] bg-(--accent) mx-auto mt-4 rounded-sm opacity-40" />
        </div>
      </div>
    </header>
  );
}
