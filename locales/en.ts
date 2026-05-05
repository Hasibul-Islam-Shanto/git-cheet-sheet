export const en = {
  hero: {
    badge: 'Developer Reference',
    title: 'Git & GitHub',
    titleHighlight: 'Cheat Sheet',
    description: 'A concise, hands-on reference for every Git command — with real examples, GitHub workflow, and recovery techniques all in one place.',
    subtitle: '$ every command · with examples · explained simply',
  },

  whatIsGit: {
    title: '// What is Git?',
    items: [
      { icon: '🗂️', title: 'Version Control System', desc: 'Tracks every change to your code over time, like a time machine for files.' },
      { icon: '🌿', title: 'Branching & Merging', desc: 'Work on features in isolation, then combine them safely.' },
      { icon: '👥', title: 'Collaboration', desc: 'Multiple developers work on the same project without conflicts.' },
      { icon: '☁️', title: 'GitHub = Cloud + Collaboration', desc: 'GitHub hosts your Git repos online. Push code, open PRs, review changes.' },
    ],
  },

  sections: {
    s01: '01 — Setup & Initialize',
    s02: '02 — Staging & Commits',
    s03: '03 — Branching',
    s04: '04 — Remote & GitHub',
    s05: '05 — Undo & Recovery',
    s06: '06 — Log & History',
    s07: '07 — Advanced Commands',
    s08: '08 — Quick Reference',
  },

  quickRef: {
    colCommand: 'Command',
    colDesc: 'What it does',
  },

  ui: {
    search: 'Search commands...',
    searchShortcut: '⌘K',
    saved: 'Saved',
    savedCommands: 'Saved Commands',
    noBookmarks: 'No bookmarks yet',
    noBookmarksDesc: 'Click the bookmark icon next to any command to save it here for quick access.',
    clearAll: 'Clear all bookmarks',
    copy: 'Copy',
    copied: '✓ Copied',
    bookmarkAdd: 'Bookmark this command',
    bookmarkRemove: 'Remove bookmark',
    viewDesc: 'What does this do?',
    seeInAction: 'See it in action →',
    backToCheatSheet: '← Back to Cheat Sheet',
    reset: 'Reset',
    close: '✕',
  },

  modal: {
    command: 'Command',
    whatItDoes: 'What it does',
    whenToUse: 'When to use',
    watchOut: '⚠️ Watch out',
    proTip: '💡 Pro tip',
  },

  search: {
    placeholder: 'Search commands...',
    hint: 'Type a command name, flag, or keyword...',
    keepTyping: 'Keep typing...',
    noResults: 'No commands found',
    noResultsHint: 'Try searching for "reset", "branch", "stash"...',
  },

  bookmarks: {
    header: 'Saved Commands',
    empty: 'No bookmarks yet',
    emptyDesc: 'Click the bookmark icon next to any command to save it here.',
    clearAll: 'Clear all bookmarks',
  },

  visualizer: {
    backToCheatSheet: '← Back to Cheat Sheet',
    reset: '↺ Reset',
    analogy: 'Real World Analogy',
    whatsHappening: "📌 What's happening",
    whyItMatters: '💡 Why does this matter?',
    whatChanged: '🔄 What changed?',
    theCommand: '💻 The command',
    previous: '← Previous',
    nextStep: 'Next Step →',
    complete: 'Complete ✓',
    keyboardHint: '← → arrow keys to navigate · swipe on mobile',
    scenarioComplete: 'Scenario Complete!',
    commandsUsed: 'Commands you used',
    tryItYourself: '💻 Try it yourself',
    nextScenario: 'Next',
    stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
  },

  footer: 'Git & GitHub Cheat Sheet · All commands tested · Local only unless noted',
}

export type TranslationKeys = typeof en
