import { sections, quickRef, workflowSteps } from "@/data/commands";
import Hero from "@/components/Hero";
import WhatIsGit from "@/components/WhatIsGit";
import SectionTitle from "@/components/SectionTitle";
import CommandCard from "@/components/CommandCard";
import GitHubWorkflow from "@/components/GitHubWorkflow";
import QuickRefTable from "@/components/QuickRefTable";
import Footer from "@/components/Footer";
import BookmarksTrigger from "@/components/bookmarks/BookmarksTrigger";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "hi-git",
  description: "A searchable Git & GitHub cheat sheet for developers.",
  url: "https://git-sheet.hi-shanto.me",
  author: {
    "@type": "Person",
    url: "https://git-sheet.hi-shanto.me",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://git-sheet.hi-shanto.me",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <main className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed top-5 right-5 z-30 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
        <BookmarksTrigger />
      </div>
      <Hero />

      <div className="max-w-7xl mx-auto px-4">
        <WhatIsGit />

        {sections.map((section) => {
          const sectionLabel = section.label.replace(/^\d+ — /, "");
          return (
            <div key={section.id}>
              <SectionTitle label={section.label} />
              <div className="card-grid grid grid-cols-2 gap-4">
                {section.cards.map((card) => (
                  <CommandCard
                    key={card.id}
                    card={card}
                    sectionLabel={sectionLabel}
                  />
                ))}
                {section.id === "remote" && (
                  <GitHubWorkflow steps={workflowSteps} />
                )}
              </div>
            </div>
          );
        })}

        <SectionTitle label="08 — Quick Reference" />
        <QuickRefTable rows={quickRef} />
      </div>

      <Footer />
    </main>
  );
}
