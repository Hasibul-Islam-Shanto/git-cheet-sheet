import { sections, quickRef, workflowSteps, whatIsGit } from '@/data/commands'
import Hero from '@/components/Hero'
import WhatIsGit from '@/components/WhatIsGit'
import SectionTitle from '@/components/SectionTitle'
import CommandCard from '@/components/CommandCard'
import GitHubWorkflow from '@/components/GitHubWorkflow'
import QuickRefTable from '@/components/QuickRefTable'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="pb-20">
      <Hero />

      <div className="max-w-7xl mx-auto px-4">
        <WhatIsGit items={whatIsGit} />

        {sections.map((section) => (
          <div key={section.id}>
            <SectionTitle label={section.label} />
            <div className="card-grid grid grid-cols-2 gap-4">
              {section.cards.map((card) => (
                <CommandCard key={card.id} card={card} />
              ))}
              {section.id === 'remote' && (
                <GitHubWorkflow steps={workflowSteps} />
              )}
            </div>
          </div>
        ))}

        <SectionTitle label="08 — Quick Reference" />
        <QuickRefTable rows={quickRef} />
      </div>

      <Footer />
    </main>
  )
}
