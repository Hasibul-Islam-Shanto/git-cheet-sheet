import type { Section, QuickRefRow, WorkflowStep, WhatIsGitItem } from '@/types'

export const whatIsGit: WhatIsGitItem[] = [
  {
    icon: '🗂️',
    title: 'Version Control System',
    description:
      'Records every change to your code — who changed it, what changed, and when. Roll back to any previous state, compare versions side by side, or trace exactly when a bug was introduced.',
  },
  {
    icon: '🌿',
    title: 'Branching & Merging',
    description:
      'Create isolated branches to build features or fix bugs without touching the main codebase. When ready, merge them back cleanly — or discard them if the idea does not pan out.',
  },
  {
    icon: '👥',
    title: 'Collaboration',
    description:
      'Teams of any size can work on the same codebase simultaneously. Git tracks who changed what, helps resolve conflicting edits, and keeps everyone in sync without overwriting each other.',
  },
  {
    icon: '☁️',
    title: 'GitHub = Cloud + Collaboration',
    description:
      'GitHub stores your Git repositories in the cloud and adds a web UI for code review. Pull Requests, Issues, and Actions make it the platform teams use to ship and maintain software together.',
  },
]

export const sections: Section[] = [
  {
    id: 'setup',
    label: '01 — Setup & Initialize',
    cards: [
      {
        id: 'global-config',
        icon: '⚙️',
        iconVariant: 'config',
        title: 'Global Config',
        subtitle: 'Set your identity once',
        commands: [
          {
            label: 'Set username & email',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' config ', type: 'plain' },
                { text: '--global', type: 'flag' },
                { text: ' user.name ', type: 'plain' },
                { text: '"John Doe"', type: 'str' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' config ', type: 'plain' },
                { text: '--global', type: 'flag' },
                { text: ' user.email ', type: 'plain' },
                { text: '"john@email.com"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Set default editor & branch name',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' config ', type: 'plain' },
                { text: '--global', type: 'flag' },
                { text: ' core.editor ', type: 'plain' },
                { text: '"code"', type: 'str' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' config ', type: 'plain' },
                { text: '--global', type: 'flag' },
                { text: ' init.defaultBranch ', type: 'plain' },
                { text: 'main', type: 'branch' },
              ],
            ],
          },
          {
            label: 'View all config',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' config ', type: 'plain' },
                { text: '--list', type: 'flag' },
              ],
            ],
          },
        ],
      },
      {
        id: 'init-clone',
        icon: '🚀',
        iconVariant: 'init',
        title: 'Init & Clone',
        subtitle: 'Start a repo locally or from remote',
        commands: [
          {
            label: 'Create new local repo',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' init my-project', type: 'plain' },
              ],
              [
                { text: 'cd', type: 'kw' },
                { text: ' my-project', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Clone from GitHub',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' clone ', type: 'plain' },
                { text: 'https://github.com/user/repo.git', type: 'str' },
              ],
            ],
          },
          {
            label: 'Clone into a specific folder',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' clone ', type: 'plain' },
                { text: 'https://github.com/user/repo.git', type: 'str' },
                { text: ' ', type: 'plain' },
                { text: 'my-folder', type: 'branch' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'staging',
    label: '02 — Staging & Commits',
    cards: [
      {
        id: 'staging-files',
        icon: '📦',
        iconVariant: 'stage',
        title: 'Staging Files',
        subtitle: 'Choose what goes into the next commit',
        commands: [
          {
            label: 'Check current status',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' status', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Stage a specific file',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' add index.html', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Stage all changed files',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' add ', type: 'plain' },
                { text: '.', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Unstage a file',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' restore ', type: 'plain' },
                { text: '--staged', type: 'flag' },
                { text: ' index.html', type: 'plain' },
              ],
            ],
          },
          {
            label: "See what's staged vs unstaged",
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' diff ', type: 'plain' },
                { text: '--staged', type: 'flag' },
              ],
            ],
          },
        ],
      },
      {
        id: 'committing',
        icon: '✅',
        iconVariant: 'stage',
        title: 'Committing',
        subtitle: 'Save a snapshot of staged changes',
        commands: [
          {
            label: 'Commit with a message',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' commit ', type: 'plain' },
                { text: '-m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"feat: add login page"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Stage + commit tracked files at once',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' commit ', type: 'plain' },
                { text: '-am', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"fix: typo in header"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Amend last commit message',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' commit ', type: 'plain' },
                { text: '--amend -m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"fix: correct message"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Empty commit (trigger CI)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' commit ', type: 'plain' },
                { text: '--allow-empty -m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"chore: trigger CI"', type: 'str' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'branching',
    label: '03 — Branching',
    cards: [
      {
        id: 'branch-basics',
        icon: '🌿',
        iconVariant: 'branch',
        title: 'Branch Basics',
        subtitle: 'Create, switch, list, delete',
        commands: [
          {
            label: 'List all branches',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' branch            ', type: 'plain' },
                { text: '# local', type: 'cmt' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' branch ', type: 'plain' },
                { text: '-a', type: 'flag' },
                { text: '         ', type: 'plain' },
                { text: '# local + remote', type: 'cmt' },
              ],
            ],
          },
          {
            label: 'Create a new branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' branch ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Switch to a branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' switch ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Create & switch in one step',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' switch ', type: 'plain' },
                { text: '-c', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'feature/signup', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Delete a branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' branch ', type: 'plain' },
                { text: '-d', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
                { text: '   ', type: 'plain' },
                { text: '# safe', type: 'cmt' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' branch ', type: 'plain' },
                { text: '-D', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
                { text: '   ', type: 'plain' },
                { text: '# force', type: 'cmt' },
              ],
            ],
          },
          {
            label: 'Rename current branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' branch ', type: 'plain' },
                { text: '-m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'new-name', type: 'branch' },
              ],
            ],
          },
        ],
      },
      {
        id: 'merge-rebase',
        icon: '🔀',
        iconVariant: 'merge',
        title: 'Merge & Rebase',
        subtitle: 'Combine branch histories',
        commands: [
          {
            label: 'Merge a branch into current',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' switch ', type: 'plain' },
                { text: 'main', type: 'branch' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' merge ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Merge without fast-forward (keeps history)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' merge ', type: 'plain' },
                { text: '--no-ff', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Rebase onto main (cleaner history)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' switch ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' rebase ', type: 'plain' },
                { text: 'main', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Abort a conflicting rebase',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' rebase ', type: 'plain' },
                { text: '--abort', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Continue after resolving conflicts',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' rebase ', type: 'plain' },
                { text: '--continue', type: 'flag' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'remote',
    label: '04 — Remote & GitHub',
    cards: [
      {
        id: 'remote-commands',
        icon: '☁️',
        iconVariant: 'remote',
        title: 'Remote Commands',
        subtitle: 'Connect & sync with GitHub',
        commands: [
          {
            label: 'Add a remote (GitHub)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' remote add ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: 'https://github.com/user/repo.git', type: 'str' },
              ],
            ],
          },
          {
            label: 'View remotes',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' remote ', type: 'plain' },
                { text: '-v', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Push branch to GitHub',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' push ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: 'main', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Push & set upstream (first time)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' push ', type: 'plain' },
                { text: '-u', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Pull latest from remote',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' pull ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: 'main', type: 'branch' },
              ],
            ],
          },
          {
            label: 'Fetch (download without merge)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' fetch ', type: 'plain' },
                { text: 'origin', type: 'remote' },
              ],
            ],
          },
          {
            label: 'Delete a remote branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' push ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: '--delete', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'undo',
    label: '05 — Undo & Recovery',
    cards: [
      {
        id: 'undo-changes',
        icon: '↩️',
        iconVariant: 'undo',
        title: 'Undo Changes',
        subtitle: 'Revert, reset, restore',
        commands: [
          {
            label: 'Discard changes in working directory',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' restore index.html', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Undo last commit (keep changes)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' reset ', type: 'plain' },
                { text: '--soft', type: 'flag' },
                { text: ' HEAD~1', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Undo last commit (discard changes) ⚠️',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' reset ', type: 'plain' },
                { text: '--hard', type: 'flag' },
                { text: ' HEAD~1', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Revert a commit (safe, creates new commit)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' revert ', type: 'plain' },
                { text: 'a3f1b2c', type: 'str' },
              ],
            ],
          },
          {
            label: 'Recover lost commits with reflog',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' reflog', type: 'plain' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' reset ', type: 'plain' },
                { text: '--hard', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'HEAD@{3}', type: 'str' },
              ],
            ],
          },
        ],
      },
      {
        id: 'stash',
        icon: '🗄️',
        iconVariant: 'stash',
        title: 'Stash',
        subtitle: 'Save work temporarily without committing',
        commands: [
          {
            label: 'Stash current changes',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Stash with a label',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash push ', type: 'plain' },
                { text: '-m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"WIP: login form"', type: 'str' },
              ],
            ],
          },
          {
            label: 'List all stashes',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash list', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Apply latest stash',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash pop', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Apply a specific stash',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash apply ', type: 'plain' },
                { text: 'stash@{2}', type: 'str' },
              ],
            ],
          },
          {
            label: 'Drop a stash',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' stash drop ', type: 'plain' },
                { text: 'stash@{0}', type: 'str' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'log',
    label: '06 — Log & History',
    cards: [
      {
        id: 'git-log',
        icon: '📜',
        iconVariant: 'log',
        title: 'git log',
        subtitle: 'Inspect commit history',
        commands: [
          {
            label: 'Basic log',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Compact one-line log',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log ', type: 'plain' },
                { text: '--oneline', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Visual branch graph',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log ', type: 'plain' },
                { text: '--oneline --graph --all', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Filter by author',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log ', type: 'plain' },
                { text: '--author=', type: 'flag' },
                { text: '"Alice"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Log since a date',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log ', type: 'plain' },
                { text: '--since=', type: 'flag' },
                { text: '"2026-01-01"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Reflog (every HEAD movement)',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' reflog', type: 'plain' },
              ],
            ],
          },
        ],
      },
      {
        id: 'tags',
        icon: '🏷️',
        iconVariant: 'tag',
        title: 'Tags',
        subtitle: 'Mark release versions',
        commands: [
          {
            label: 'List all tags',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' tag', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Create a lightweight tag',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' tag ', type: 'plain' },
                { text: 'v1.0.0', type: 'tag' },
              ],
            ],
          },
          {
            label: 'Create an annotated tag',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' tag ', type: 'plain' },
                { text: '-a', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'v1.0.0', type: 'tag' },
                { text: ' ', type: 'plain' },
                { text: '-m', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"Release v1.0.0"', type: 'str' },
              ],
            ],
          },
          {
            label: 'Push tags to GitHub',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' push ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: '--tags', type: 'flag' },
              ],
            ],
          },
          {
            label: 'Delete a tag',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' tag ', type: 'plain' },
                { text: '-d', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'v1.0.0', type: 'tag' },
              ],
              [
                { text: 'git', type: 'kw' },
                { text: ' push ', type: 'plain' },
                { text: 'origin', type: 'remote' },
                { text: ' ', type: 'plain' },
                { text: '--delete', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'v1.0.0', type: 'tag' },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'advanced',
    label: '07 — Advanced Commands',
    cards: [
      {
        id: 'cherry-pick',
        icon: '🍒',
        iconVariant: 'branch',
        title: 'Cherry-pick',
        subtitle: 'Copy specific commits to current branch',
        commands: [
          {
            label: 'Apply a single commit from another branch',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' cherry-pick ', type: 'plain' },
                { text: 'a3f1b2c', type: 'str' },
              ],
            ],
          },
          {
            label: 'Cherry-pick a range of commits',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' cherry-pick ', type: 'plain' },
                { text: 'a3f1b2c', type: 'str' },
                { text: '..', type: 'plain' },
                { text: 'f9e3d11', type: 'str' },
              ],
            ],
          },
          {
            label: 'Cherry-pick without committing',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' cherry-pick ', type: 'plain' },
                { text: '-n', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: 'a3f1b2c', type: 'str' },
              ],
            ],
          },
        ],
      },
      {
        id: 'diff-blame',
        icon: '🔍',
        iconVariant: 'log',
        title: 'Diff & Blame',
        subtitle: 'Inspect what changed and who changed it',
        commands: [
          {
            label: 'See unstaged changes',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' diff', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Compare two branches',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' diff ', type: 'plain' },
                { text: 'main', type: 'branch' },
                { text: '..', type: 'plain' },
                { text: 'feature/login', type: 'branch' },
              ],
            ],
          },
          {
            label: 'See who changed each line',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' blame index.html', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Search for a string in history',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log ', type: 'plain' },
                { text: '-S', type: 'flag' },
                { text: ' ', type: 'plain' },
                { text: '"loginUser"', type: 'str' },
                { text: ' ', type: 'plain' },
                { text: '--oneline', type: 'flag' },
              ],
            ],
          },
        ],
      },
      {
        id: 'interactive-rebase',
        icon: '✂️',
        iconVariant: 'merge',
        title: 'Interactive Rebase',
        subtitle: 'Rewrite, squash, edit commits',
        commands: [
          {
            label: 'Squash last 3 commits interactively',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' rebase ', type: 'plain' },
                { text: '-i', type: 'flag' },
                { text: ' HEAD~3', type: 'plain' },
              ],
            ],
          },
          {
            label: 'In the editor that opens:',
            tokens: [
              [
                { text: 'pick', type: 'kw' },
                { text: ' a3f1b2c feat: add login', type: 'plain' },
              ],
              [
                { text: 'squash', type: 'flag' },
                { text: ' 9d4e521 fix: typo', type: 'plain' },
              ],
              [
                { text: 'squash', type: 'flag' },
                { text: ' 1bc7830 fix: spacing', type: 'plain' },
              ],
              [
                { text: '# → becomes 1 clean commit', type: 'cmt' },
              ],
            ],
          },
        ],
      },
      {
        id: 'gitignore',
        icon: '📁',
        iconVariant: 'init',
        title: '.gitignore',
        subtitle: 'Tell Git what to never track',
        commands: [
          {
            label: 'Example .gitignore file',
            tokens: [
              [{ text: '# Dependencies', type: 'cmt' }],
              [{ text: 'node_modules/', type: 'plain' }],
              [{ text: '# Environment secrets', type: 'cmt' }],
              [{ text: '.env', type: 'plain' }],
              [{ text: '.env.local', type: 'plain' }],
              [{ text: '# Build output', type: 'cmt' }],
              [{ text: 'dist/', type: 'plain' }],
              [{ text: 'build/', type: 'plain' }],
              [{ text: '# OS files', type: 'cmt' }],
              [{ text: '.DS_Store', type: 'plain' }],
              [{ text: 'Thumbs.db', type: 'plain' }],
            ],
          },
          {
            label: 'Ignore already-tracked file',
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' rm ', type: 'plain' },
                { text: '--cached', type: 'flag' },
                { text: ' .env', type: 'plain' },
              ],
            ],
          },
        ],
      },
    ],
  },
]

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    label: 'Fork & clone repo from GitHub',
    tokens: [
      [
        { text: 'git', type: 'kw' },
        { text: ' clone ', type: 'plain' },
        { text: 'https://github.com/you/forked-repo.git', type: 'str' },
      ],
    ],
  },
  {
    step: 2,
    label: 'Create a feature branch',
    tokens: [
      [
        { text: 'git', type: 'kw' },
        { text: ' switch ', type: 'plain' },
        { text: '-c', type: 'flag' },
        { text: ' ', type: 'plain' },
        { text: 'feature/my-change', type: 'branch' },
      ],
    ],
  },
  {
    step: 3,
    label: 'Commit your changes',
    tokens: [
      [
        { text: 'git', type: 'kw' },
        { text: ' add ', type: 'plain' },
        { text: '.', type: 'flag' },
      ],
      [
        { text: 'git', type: 'kw' },
        { text: ' commit ', type: 'plain' },
        { text: '-m', type: 'flag' },
        { text: ' ', type: 'plain' },
        { text: '"feat: my change"', type: 'str' },
      ],
    ],
  },
  {
    step: 4,
    label: 'Push to your fork',
    tokens: [
      [
        { text: 'git', type: 'kw' },
        { text: ' push ', type: 'plain' },
        { text: '-u', type: 'flag' },
        { text: ' ', type: 'plain' },
        { text: 'origin', type: 'remote' },
        { text: ' ', type: 'plain' },
        { text: 'feature/my-change', type: 'branch' },
      ],
    ],
  },
  {
    step: 5,
    label: 'Open Pull Request on GitHub UI',
    tokens: [
      [{ text: '# Go to GitHub → Compare & Pull Request', type: 'cmt' }],
      [{ text: '# Add title, description → Submit PR', type: 'cmt' }],
    ],
  },
  {
    step: 6,
    label: 'Sync with upstream after merge',
    tokens: [
      [
        { text: 'git', type: 'kw' },
        { text: ' switch ', type: 'plain' },
        { text: 'main', type: 'branch' },
      ],
      [
        { text: 'git', type: 'kw' },
        { text: ' pull ', type: 'plain' },
        { text: 'upstream', type: 'remote' },
        { text: ' ', type: 'plain' },
        { text: 'main', type: 'branch' },
      ],
    ],
  },
]

export const quickRef: QuickRefRow[] = [
  { command: 'git status', description: 'Show working tree status' },
  { command: 'git add .', description: 'Stage all changes' },
  { command: 'git commit -m "msg"', description: 'Commit with message' },
  { command: 'git push origin main', description: 'Push to GitHub' },
  { command: 'git pull origin main', description: 'Pull latest from GitHub' },
  { command: 'git switch -c branch', description: 'Create + switch to branch' },
  { command: 'git merge branch', description: 'Merge branch into current' },
  { command: 'git stash', description: 'Save changes temporarily' },
  { command: 'git stash pop', description: 'Restore stashed changes' },
  { command: 'git log --oneline', description: 'Compact commit history' },
  { command: 'git reflog', description: 'Every HEAD movement' },
  { command: 'git reset --soft HEAD~1', description: 'Undo last commit, keep changes' },
  { command: 'git reset --hard HEAD~1', description: 'Undo last commit, discard changes' },
  { command: 'git revert abc123', description: 'Safe undo via new commit' },
  { command: 'git cherry-pick abc123', description: 'Copy commit to current branch' },
  { command: 'git tag v1.0.0', description: 'Create a version tag' },
  { command: 'git diff main..branch', description: 'Compare two branches' },
  { command: 'git blame file.txt', description: 'See who wrote each line' },
  { command: 'git rebase -i HEAD~3', description: 'Squash/edit last 3 commits' },
  { command: 'git remote -v', description: 'List remotes with URLs' },
]
