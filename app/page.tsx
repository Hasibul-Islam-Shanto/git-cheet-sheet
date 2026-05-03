import { sections, quickRef, workflowSteps, whatIsGit } from '@/data/commands'
import Hero from '@/components/Hero'
import WhatIsGit from '@/components/WhatIsGit'
import SectionTitle from '@/components/SectionTitle'
import CommandCard from '@/components/CommandCard'
import GitHubWorkflow from '@/components/GitHubWorkflow'
import QuickRefTable from '@/components/QuickRefTable'
import Footer from '@/components/Footer'
import BookmarksTrigger from '@/components/bookmarks/BookmarksTrigger'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'hi-git',
  description: 'A searchable Git & GitHub cheat sheet for developers.',
  url: 'https://hi-shanto.me',
  author: {
    '@type': 'Person',
    url: 'https://hi-shanto.me',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://hi-shanto.me',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function Page() {
  return (
    <main className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BookmarksTrigger />
      <Hero />

      <div className="max-w-7xl mx-auto px-4">
        <WhatIsGit items={whatIsGit} />

        {sections.map((section) => {
          const sectionLabel = section.label.replace(/^\d+ — /, '')
          return (
            <div key={section.id}>
              <SectionTitle label={section.label} />
              <div className="card-grid grid grid-cols-2 gap-4">
                {section.cards.map((card) => (
                  <CommandCard key={card.id} card={card} sectionLabel={sectionLabel} />
                ))}
                {section.id === 'remote' && (
                  <GitHubWorkflow steps={workflowSteps} />
                )}
              </div>
            </div>
          )
        })}

        <SectionTitle label="08 — Quick Reference" />
        <QuickRefTable rows={quickRef} />
      </div>

      <Footer />
    </main>
  )
}
