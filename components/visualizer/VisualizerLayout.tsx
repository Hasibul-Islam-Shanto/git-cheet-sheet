"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import { useVisualizerStore } from "@/store/useVisualizerStore";
import { scenarios, completionData } from "@/data/visualizer/scenarios";
import { useTranslation } from "@/hooks/useTranslation";
import { AnalogyCard } from "./AnalogyCard";
import { StepCard } from "./StepCard/StepCard";
import { CompletionCard } from "./CompletionCard";

interface Props {
  cmdId: string;
}

export default function VisualizerLayout({ cmdId }: Props) {
  const loadScenario = useVisualizerStore((s) => s.loadScenario);
  const clearScenario = useVisualizerStore((s) => s.clearScenario);
  const scenario = useVisualizerStore((s) => s.scenario);
  const currentStep = useVisualizerStore((s) => s.currentStep);
  const currentStepIndex = useVisualizerStore((s) => s.currentStepIndex);
  const totalSteps = useVisualizerStore((s) => s.totalSteps);
  const completedSteps = useVisualizerStore((s) => s.completedSteps);
  const isComplete = useVisualizerStore((s) => s.isComplete);
  const nextStep = useVisualizerStore((s) => s.nextStep);
  const prevStep = useVisualizerStore((s) => s.prevStep);
  const isFirstStep = useVisualizerStore((s) => s.isFirstStep);
  const isLastStep = useVisualizerStore((s) => s.isLastStep);
  const reset = useVisualizerStore((s) => s.reset);
  const { locale, t } = useTranslation();
  const foundScenario = scenarios.find((s) => s.id === cmdId);

  useLayoutEffect(() => {
    if (foundScenario) {
      loadScenario(foundScenario);
      return;
    }
    clearScenario();
  }, [foundScenario, loadScenario, clearScenario]);

  if (!foundScenario || !scenario) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-(--muted) font-mono text-base mb-2">
          Unknown command &quot;{cmdId}&quot;.
        </p>
        <p className="text-(--border) font-mono text-sm mb-6">
          Try: branch, merge, reset, rebase, stash, or cherry-pick
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-(--accent) text-sm hover:underline"
        >
          ← Back to cheat sheet
        </Link>
      </div>
    );
  }

  const completion = completionData[scenario.id];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-(--muted) hover:text-(--accent) font-mono text-sm transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.visualizer.backToCheatSheet}
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm text-(--muted) border border-(--border) hover:text-(--text) hover:border-(--muted) transition-all duration-200"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
              <path d="M2 6.5C2 4.015 4.015 2 6.5 2c1.38 0 2.615.6 3.47 1.555M11 6.5C11 8.985 8.985 11 6.5 11c-1.38 0-2.615-.6-3.47-1.555" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9.5 1.5v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.visualizer.reset}
          </button>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid var(--border)" }} className="mb-7" />

      <div className="max-w-6xl mx-auto px-4 pb-16 flex flex-col gap-6">
        <div
          className="rounded-2xl px-6 py-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-bold text-(--accent)"
              style={{
                background: "rgba(247,201,72,0.1)",
                border: "1px solid rgba(247,201,72,0.25)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 opacity-70">
                <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3.5 4.5L5.5 6.5L3.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 8.5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {scenario.command}
            </span>
            <h1 className="text-2xl font-extrabold text-(--text) leading-tight">
              {locale === "bn"
                ? (scenario.titleBn ?? scenario.title)
                : scenario.title}
            </h1>
          </div>
          <p className="text-[0.95rem] text-(--muted) leading-relaxed max-w-2xl">
            {locale === "bn"
              ? (scenario.descriptionBn ?? scenario.description)
              : scenario.description}
          </p>
        </div>

        <AnalogyCard
          icon={scenario.analogyIcon}
          analogy={
            locale === "bn"
              ? (scenario.analogyBn ?? scenario.analogy)
              : scenario.analogy
          }
          label={t.visualizer.analogy}
        />

        {isComplete ? (
          <CompletionCard
            summary={completion}
            nextScenarioId={scenario.nextScenario}
            scenarioId={scenario.id}
          />
        ) : currentStep ? (
          <StepCard
            step={currentStep}
            stepIndex={currentStepIndex}
            totalSteps={totalSteps}
            completedSteps={completedSteps}
            onNext={nextStep}
            onPrev={prevStep}
            isFirst={isFirstStep}
            isLast={isLastStep}
          />
        ) : null}
      </div>
    </div>
  );
}
