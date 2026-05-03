import type { Section, QuickRefRow, WorkflowStep, WhatIsGitItem } from '@/types'

export const whatIsGit: WhatIsGitItem[] = [
  {
    icon: '🗂️',
    title: 'Version Control System',
    description: 'Tracks every change to your code — what, when, and who. Roll back anytime.',
  },
  {
    icon: '🌿',
    title: 'Branching & Merging',
    description: 'Work on features in isolation. Merge when ready, discard if not.',
  },
  {
    icon: '👥',
    title: 'Collaboration',
    description: 'Multiple people, one codebase. Git keeps changes in sync without conflicts.',
  },
  {
    icon: '☁️',
    title: 'GitHub = Cloud + Collaboration',
    description: 'Hosts your repos online and adds Pull Requests, Issues, and CI/CD.',
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
            description: {
              what: 'Tells Git who you are by setting your name and email globally on your machine.',
              when: 'Run this once after installing Git on a new computer. Every commit you make will be tagged with this identity.',
              tip: 'Use the same email as your GitHub account so your commits are linked to your profile correctly.',
            },
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
            description: {
              what: 'Sets your preferred code editor for Git messages and changes the default branch name from "master" to "main".',
              when: 'Run once when setting up Git. The editor setting affects what opens when you run git commit without -m.',
              tip: 'Use "code --wait" for VS Code so Git waits for you to close the editor before continuing.',
            },
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
            description: {
              what: 'Lists every Git configuration setting currently active on your machine, including global and local settings.',
              when: 'Use when you want to check what your current Git setup looks like or debug a configuration issue.',
              tip: 'Add --global to see only global settings, or --local to see only the current repo settings.',
            },
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
            description: {
              what: 'Creates a brand new Git repository in the specified folder by initializing a hidden .git directory.',
              when: 'Use when starting a brand new project from scratch on your local machine.',
              tip: 'After init, create a .gitignore file before making your first commit to avoid tracking unwanted files.',
            },
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
            description: {
              what: 'Downloads a complete copy of a remote repository including all its history, branches, and files.',
              when: 'Use when you want to work on an existing project hosted on GitHub or another remote server.',
              tip: 'Cloning automatically sets up the remote "origin" pointing to the source — no manual git remote add needed.',
            },
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
            description: {
              what: 'Same as git clone but saves the repository into a folder with a custom name instead of the repo name.',
              when: 'Use when the default repo name is too long, unclear, or conflicts with an existing folder.',
            },
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
            description: {
              what: 'Shows which files have been modified, which are staged for commit, and which are untracked by Git.',
              when: 'Run this constantly — before staging, before committing, and whenever you are unsure what state your repo is in.',
              tip: 'Use "git status -s" for a compact one-line-per-file summary.',
            },
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' status', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Stage a specific file',
            description: {
              what: 'Adds a single file to the staging area, marking it to be included in the next commit.',
              when: 'Use when you only want to commit changes from one specific file, not everything you have edited.',
              tip: 'This is safer than "git add ." — you have full control over exactly what goes into each commit.',
            },
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
            description: {
              what: 'Stages all changed files in the current directory, making them ready to be included in the next commit.',
              when: 'Use when you want to include all your current changes in the next commit.',
              warning: 'Avoid this if you have unrelated changes. Use "git add filename" to stage specific files for more control.',
              tip: 'Run "git status" first to see exactly what will be staged.',
            },
          },
          {
            label: 'Unstage a file',
            description: {
              what: 'Removes a file from the staging area without discarding the actual changes in the file.',
              when: 'Use when you accidentally staged a file you did not mean to include in the next commit.',
              tip: 'The file changes are still there in your working directory — only the staging is undone.',
            },
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
            description: {
              what: 'Shows the exact line-by-line differences between your staged changes and the last commit.',
              when: 'Use before committing to do a final review of exactly what will be included in the commit.',
              tip: 'Without --staged, git diff shows unstaged changes. With --staged it shows what is about to be committed.',
            },
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
            description: {
              what: 'Creates a permanent snapshot of your staged changes in the repository history with a descriptive message.',
              when: 'Use after staging your changes with git add. A commit is like a save point — you can always come back to it.',
              tip: 'Write messages in present tense: "add login page" not "added login page". Keep them short but descriptive.',
            },
          },
          {
            label: 'Stage + commit tracked files at once',
            description: {
              what: 'Stages all changes to already-tracked files and commits them in a single command.',
              when: 'Use for quick commits when you have only modified existing files and want to skip a separate git add step.',
              warning: 'This does NOT stage new (untracked) files. If you created a new file, you still need git add first.',
            },
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
            description: {
              what: 'Replaces the most recent commit with a new one, updating its message or contents.',
              when: 'Use immediately after a commit when you notice a typo in the message or forgot to include a file.',
              warning: 'Never amend a commit that has already been pushed to a shared remote branch. It rewrites history and will cause conflicts for teammates.',
            },
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
            description: {
              what: 'Creates a commit with no file changes — useful for triggering automated pipelines or CI/CD workflows.',
              when: 'Use when you need to re-run a CI pipeline or GitHub Action without actually changing any code.',
              tip: 'This is a handy trick when a deployment is stuck and you need to kick it without making a fake code change.',
            },
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
            description: {
              what: 'Shows all local branches in your repository. Adding -a also shows remote-tracking branches.',
              when: 'Use to see what branches exist before creating a new one or switching between them.',
              tip: 'The branch with a * next to it is your currently active branch.',
            },
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
            description: {
              what: 'Creates a new branch pointer at the current commit without switching to it.',
              when: 'Use when you want to start a new line of development without affecting your current branch.',
              tip: 'Use "git switch -c branch-name" to create and switch in one step.',
            },
          },
          {
            label: 'Switch to a branch',
            description: {
              what: "Moves your working directory to the selected branch, updating all files to match that branch's state.",
              when: "Use when you want to start working on a different branch or review someone else's branch.",
              warning: 'If you have uncommitted changes, Git may block the switch or carry those changes over. Commit or stash first.',
            },
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
            description: {
              what: 'Creates a new branch and immediately switches to it in a single command.',
              when: 'This is the most common way to start working on a new feature — use it instead of separate branch + switch commands.',
              tip: 'Name branches descriptively: "feature/user-auth", "fix/login-bug", "chore/update-deps".',
            },
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
            description: {
              what: '-d safely deletes a branch only if it has been merged. -D force-deletes regardless of merge status.',
              when: 'Use after a feature branch has been merged and is no longer needed.',
              warning: 'Using -D will permanently delete the branch even if unmerged work exists. Use with caution.',
              tip: 'You cannot delete the branch you are currently on. Switch to main first.',
            },
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
            description: {
              what: 'Renames your currently active branch to a new name.',
              when: 'Use when you made a typo in the branch name or want to better describe its purpose.',
              warning: 'If the branch was already pushed to remote, you will need to delete the old remote branch and push the renamed one.',
            },
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
            description: {
              what: 'Combines the history of another branch into your current branch, creating a new merge commit.',
              when: "Use when you're done working on a feature branch and want to bring those changes into main.",
              tip: 'Always make sure your working directory is clean (no uncommitted changes) before merging.',
            },
          },
          {
            label: 'Merge without fast-forward (keeps history)',
            description: {
              what: 'Forces Git to create a merge commit even when a fast-forward is possible, preserving branch history.',
              when: 'Use when you want the history to show that a feature was developed on a separate branch before being merged.',
              tip: 'This is useful for teams who want a clear audit trail of when features were merged into main.',
            },
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
            description: {
              what: "Moves your branch's commits on top of another branch, creating a linear history without merge commits.",
              when: 'Use instead of merge when you want a clean, linear commit history.',
              warning: '⚠️ Never rebase commits that have already been pushed to a shared remote branch — it rewrites history and causes problems for teammates.',
            },
          },
          {
            label: 'Abort a conflicting rebase',
            description: {
              what: 'Cancels an in-progress rebase and returns your branch to the state it was in before the rebase started.',
              when: 'Use when a rebase runs into conflicts you are not ready to resolve, or when you realize the rebase was a mistake.',
              tip: 'This is your safe exit — do not be afraid to abort and think through the problem before trying again.',
            },
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
            description: {
              what: 'Tells Git to resume the rebase after you have manually resolved all the conflicts in the affected files.',
              when: 'Use after opening the conflicted files, fixing the conflict markers, and staging the resolved files with git add.',
              tip: 'After resolving conflicts, run git add on the fixed files before running git rebase --continue.',
            },
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
            description: {
              what: 'Links your local repository to a remote repository on GitHub by giving it the shortname "origin".',
              when: 'Use once after creating a new local repo that you want to push to GitHub for the first time.',
              tip: '"origin" is just a conventional name — you can use any name, but origin is the universally understood default.',
            },
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
            description: {
              what: 'Lists all remote connections your local repo knows about, showing both the fetch and push URLs.',
              when: 'Use to verify that your remote is set up correctly or to check what URL your repo is connected to.',
            },
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
            description: {
              what: 'Uploads your local branch commits to the corresponding branch on the remote GitHub repository.',
              when: 'Use whenever you want to share your work, back up your commits, or open a pull request on GitHub.',
              warning: 'If the remote has new commits you do not have locally, Git will reject the push. Pull first, then push.',
            },
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
            description: {
              what: 'Pushes your local branch to the remote and sets it as the tracking upstream, so future pushes only need "git push".',
              when: "Use the first time you push a new local branch to GitHub. After this, you can just type 'git push'.",
              tip: 'The -u flag is short for --set-upstream. You only need it once per branch.',
            },
          },
          {
            label: 'Pull latest from remote',
            description: {
              what: 'Downloads new commits from the remote branch and merges them into your current local branch.',
              when: "Use regularly to stay up to date with your teammates' work, especially before starting new work.",
              tip: 'git pull is shorthand for git fetch + git merge. If you want more control, use them separately.',
            },
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
            description: {
              what: 'Downloads all new commits and branches from the remote without touching your current working branch.',
              when: 'Use when you want to see what has changed on the remote before deciding whether to merge.',
              tip: 'After fetching, use "git log origin/main" to review remote changes before merging them in.',
            },
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
            description: {
              what: 'Removes a branch from the remote GitHub repository without affecting your local branch.',
              when: 'Use after a pull request has been merged and the remote feature branch is no longer needed.',
              tip: 'GitHub also has a "Delete branch" button on merged pull requests which does the same thing.',
            },
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
            description: {
              what: 'Throws away all unsaved changes in a file and restores it to the state of the last commit.',
              when: 'Use when you have made changes to a file that you no longer want and want to start fresh.',
              warning: '⚠️ This permanently discards your changes. There is no way to recover them once run.',
            },
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
            description: {
              what: 'Moves the branch pointer back by one commit while keeping all changes staged and ready to recommit.',
              when: 'Use when you committed too early or want to rewrite the commit message.',
              tip: 'This is the safe way to undo a commit — your work is preserved in the staging area.',
            },
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
            description: {
              what: 'Moves the current branch pointer back by one commit and completely discards all changes from that commit.',
              when: 'Use when you want to completely undo the last commit and throw away those changes permanently.',
              warning: '⚠️ This is destructive — changes are gone forever. If you pushed the commit to GitHub, a force push will be required.',
              tip: 'Use --soft instead if you want to keep your changes staged.',
            },
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
            description: {
              what: 'Creates a new commit that undoes the changes from a specific commit, without rewriting history.',
              when: 'Use when you need to undo a commit that has already been pushed to a shared branch.',
              tip: 'Prefer revert over reset for public branches — it is safe because it does not rewrite history.',
            },
          },
          {
            label: 'Recover lost commits with reflog',
            description: {
              what: 'git reflog shows every place HEAD has pointed. git reset then jumps back to any of those states to recover lost commits.',
              when: 'Use when you have accidentally deleted a branch, done a hard reset, or lost commits that seemed gone forever.',
              tip: 'Git almost never truly deletes commits immediately — reflog is your safety net for up to 90 days.',
            },
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
            description: {
              what: 'Temporarily saves your uncommitted changes to a hidden stack, giving you a clean working directory.',
              when: "Use when you need to quickly switch branches or pull updates but aren't ready to commit your current work.",
              tip: 'Use "git stash push -m \'description\'" to label your stash so you remember what\'s in it later.',
            },
          },
          {
            label: 'Stash with a label',
            description: {
              what: 'Same as git stash but attaches a descriptive message so you can identify it later.',
              when: 'Use whenever you stash something you might not pop immediately. Labels make it much easier to find later.',
              tip: 'Always label your stashes if you might have multiple. "git stash list" without labels is confusing.',
            },
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
            description: {
              what: 'Shows all stashed changes in order, with their index number and message.',
              when: 'Use to see what stashes you have saved before deciding which one to apply.',
            },
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
            description: {
              what: 'Applies the most recent stash back to your working directory and removes it from the stash stack.',
              when: "Use when you're ready to continue the work you set aside with git stash.",
              tip: 'Use "git stash apply stash@{N}" to apply a specific stash without removing it from the stack.',
            },
          },
          {
            label: 'Apply a specific stash',
            description: {
              what: 'Restores a specific stash by its index number without removing it from the stash list.',
              when: 'Use when you have multiple stashes and want to apply one that is not the most recent.',
              tip: 'Get the index number from "git stash list". stash@{0} is the newest, stash@{1} is the one before that.',
            },
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
            description: {
              what: 'Permanently deletes a specific stash entry from the stash stack.',
              when: 'Use to clean up old stashes you no longer need.',
              warning: 'Once dropped, a stash cannot be recovered. Make sure you no longer need it before dropping.',
            },
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
            description: {
              what: 'Shows the full commit history of the current branch including hash, author, date, and message.',
              when: 'Use to review what has been committed, who committed it, and when.',
              tip: 'Press q to exit the log view in the terminal.',
            },
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' log', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Compact one-line log',
            description: {
              what: 'Shows a condensed commit history with one line per commit showing only the short hash and message.',
              when: 'Use for a quick overview of recent commits without the noise of author and date info.',
              tip: 'This is the most commonly used log format for day-to-day work.',
            },
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
            description: {
              what: 'Shows the commit history as an ASCII art graph showing how branches have diverged and merged over time.',
              when: 'Use when working with multiple branches to understand how they relate to each other.',
              tip: 'Combine with --oneline for a clean readable branch graph: git log --oneline --graph --all',
            },
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
            description: {
              what: "Shows only the commits made by a specific author, filtering out everyone else's commits.",
              when: "Use to review your own work, audit a teammate's changes, or find a specific person's contribution.",
              tip: 'You can use a partial name or email. Git matches anything containing what you provide.',
            },
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
            description: {
              what: 'Shows only commits made after a specific date, filtering the full history to a time window.',
              when: 'Use to review what changed during a sprint, deployment window, or specific time period.',
              tip: 'You can also use --until="2026-04-01" to set an end date, or combine both for a date range.',
            },
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
            description: {
              what: 'Shows a log of everywhere HEAD has pointed — including resets, merges, checkouts, and rebases that git log hides.',
              when: 'Use when you need to recover lost commits, undo a bad reset, or see the full history of what you have done.',
              tip: 'Reflog is local only and expires after 90 days. It is your ultimate safety net for local mistakes.',
            },
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
            description: {
              what: 'Shows all tags that have been created in the repository.',
              when: 'Use to see all version markers that exist, usually before creating a new release tag.',
            },
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' tag', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Create a lightweight tag',
            description: {
              what: 'Creates a simple tag pointing to the current commit — just a name, no extra metadata.',
              when: 'Use for quick internal markers. For releases, prefer annotated tags with -a.',
            },
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
            description: {
              what: 'Creates a full tag object with a tagger name, email, date, and message — the recommended way to tag releases.',
              when: 'Use for every public release. Annotated tags are the standard for versioning software.',
              tip: 'Annotated tags show up in "git describe" and are treated as formal release points by GitHub.',
            },
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
            description: {
              what: 'Uploads all local tags to the remote GitHub repository. Tags are not pushed by default with git push.',
              when: 'Use after creating release tags locally that you want visible on GitHub.',
              tip: 'To push a single tag: git push origin v1.0.0. Use --tags only when pushing all tags at once.',
            },
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
            description: {
              what: 'Removes a tag locally with -d and from the remote repository with the push --delete command.',
              when: 'Use when a tag was created by mistake or points to the wrong commit.',
              warning: 'If other people have already pulled the tag, deleting it remotely will cause confusion. Communicate with your team first.',
            },
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
            description: {
              what: 'Copies a specific commit from any branch and applies it as a new commit on your current branch.',
              when: 'Use when a bug fix or small feature exists on another branch and you need it on your current branch without merging everything.',
              tip: 'The copied commit gets a new hash — it is a copy, not a move. The original commit remains on the source branch.',
            },
          },
          {
            label: 'Cherry-pick a range of commits',
            description: {
              what: 'Copies a consecutive range of commits from another branch and applies them to your current branch.',
              when: 'Use when you need several related commits from another branch but not the entire branch history.',
              warning: 'The range is exclusive of the first hash and inclusive of the last. Use commit~..commit to be explicit.',
            },
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
            description: {
              what: 'Applies the changes from a commit to your working directory and stages them, but does not create a commit.',
              when: 'Use when you want to review or modify the cherry-picked changes before committing them.',
              tip: 'After reviewing, run git commit to finalize, or make edits and then commit.',
            },
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
            description: {
              what: 'Shows the exact line-by-line differences between your working directory and the last commit for unstaged files.',
              when: 'Use before staging to review exactly what has changed in your files.',
              tip: 'Use "git diff --staged" to see what is already staged. Together they give you the full picture.',
            },
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' diff', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Compare two branches',
            description: {
              what: 'Shows all the differences between two branches — every line that is different between them.',
              when: 'Use before merging to see exactly what a feature branch has changed compared to main.',
              tip: 'The order matters: git diff main..feature shows what feature has that main does not.',
            },
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
            description: {
              what: 'Annotates every line in a file with the commit hash, author, and date of the last change to that line.',
              when: 'Use when you need to track down who introduced a bug or when a specific line of code was changed.',
              tip: 'Do not use blame to assign fault — use it to find context and understand why code was written.',
            },
            tokens: [
              [
                { text: 'git', type: 'kw' },
                { text: ' blame index.html', type: 'plain' },
              ],
            ],
          },
          {
            label: 'Search for a string in history',
            description: {
              what: 'Searches through the entire commit history to find commits that added or removed a specific string.',
              when: 'Use when you want to find exactly when a function, variable, or piece of text was introduced or deleted.',
              tip: 'This is one of the most powerful forensic tools in Git — great for tracking down when a bug was introduced.',
            },
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
            description: {
              what: 'Opens an editor letting you rewrite, combine, reorder, or delete the last N commits before pushing.',
              when: 'Use to clean up messy local commit history — combine small fixes into one clean commit before opening a PR.',
              warning: 'Never use interactive rebase on commits already pushed to a shared branch. Only use it on local-only commits.',
              tip: 'In the editor: "pick" keeps a commit, "squash" combines it with the previous, "drop" deletes it entirely.',
            },
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
            description: {
              what: 'This shows what the interactive rebase editor looks like. You change "pick" to "squash" to combine commits.',
              when: 'This appears automatically after running git rebase -i. Edit the words on the left to control each commit.',
              tip: 'Save and close the file to continue. Git will then open another editor for the combined commit message.',
            },
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
            description: {
              what: 'A .gitignore file tells Git which files and folders to completely ignore and never track.',
              when: 'Create this file at the root of every project before your first commit to keep your repo clean.',
              tip: 'GitHub provides official .gitignore templates for every language at github.com/github/gitignore',
            },
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
            description: {
              what: 'Removes a file from Git tracking without deleting it from your disk, then lets .gitignore take over.',
              when: 'Use when you accidentally committed a file (like .env) that should have been in .gitignore from the start.',
              warning: "The file will still exist in Git history. Rotate any secrets that were exposed.",
            },
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
