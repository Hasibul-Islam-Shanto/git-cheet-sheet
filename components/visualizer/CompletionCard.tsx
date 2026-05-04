"use client";
import { motion } from "framer-motion";
import type { CompletionSummary } from "@/types/visualizer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

interface Props {
  summary: CompletionSummary;
  nextScenarioId?: string;
  scenarioId: string;
}

export function CompletionCard({ summary, nextScenarioId }: Props) {
  const { locale, t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-2xl p-8 flex flex-col items-center text-center gap-5"
      style={{
        background: "#13161f",
        border: "1px solid rgba(79,255,176,0.25)",
      }}
    >
      <div className="text-6xl">🎉</div>

      <div>
        <h2 className="text-xl font-extrabold text-[#e8eaf0] mb-2.5">
          {t.visualizer.complete}
        </h2>
        <p className="text-[0.93rem] text-[#9ba3bd] max-w-sm mx-auto leading-relaxed">
          {locale === "bn"
            ? (summary.conceptLearnedBn ?? summary.conceptLearned)
            : summary.conceptLearned}
        </p>
      </div>

      <div className="w-full max-w-xs text-left">
        <p className="text-xs font-mono font-semibold text-[#4fffb0] uppercase tracking-widest mb-2.5">
          {t.visualizer.commandsUsed}
        </p>
        <div className="flex flex-col gap-2">
          {summary.commands.map((cmd, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-[#3d4460] font-mono text-xs shrink-0">
                {i + 1}.
              </span>
              <code className="text-[#f7c948] font-mono text-[0.85rem] bg-[#0a0c12] px-3 py-1.5 rounded-lg border border-[#1e2233]">
                {cmd}
              </code>
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-full max-w-xs rounded-xl p-5 text-left"
        style={{
          background: "rgba(79,255,176,0.05)",
          border: "1px solid rgba(79,255,176,0.15)",
        }}
      >
        <p className="text-xs font-mono font-semibold text-[#4fffb0] uppercase tracking-widest mb-2">
          {t.visualizer.tryItYourself}
        </p>
        <p className="text-[0.85rem] text-[#9ba3bd] leading-relaxed font-mono">
          {locale === "bn"
            ? (summary.tryItYourselfBn ?? summary.tryItYourself)
            : summary.tryItYourself}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.9rem] font-semibold text-[#e8eaf0] border border-[#232840] hover:border-[#f7c948] hover:text-[#f7c948] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.visualizer.backToCheatSheet}
        </Link>
        {nextScenarioId && (
          <Link
            href={`/visualizer?cmd=${nextScenarioId}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[0.9rem] font-bold text-[#0d0f16] bg-[#f7c948] hover:bg-[#e6b93d] transition-colors duration-150"
          >
            {t.visualizer.nextScenario}: git {nextScenarioId}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
