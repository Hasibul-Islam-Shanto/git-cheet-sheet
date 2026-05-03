export const WELCOME_LINES = [
  'Welcome to the hi-git interactive simulator.',
  'Type a git command and press Enter to run it.',
  'Try: git branch, git merge, git reset, git stash',
  'Type "git help" to see all supported commands.',
  '',
]

export const HELP_LINES = [
  'Supported commands in this simulator:',
  '',
  '  git branch <name>          Create a new branch',
  '  git switch <name>          Switch to a branch',
  '  git switch -c <name>       Create and switch to a branch',
  '  git checkout <name>        Switch to a branch (alias)',
  '  git commit -m "<msg>"      Commit staged changes',
  '  git merge <branch>         Merge a branch into current',
  '  git reset --soft HEAD~1    Undo last commit, keep staged',
  '  git reset --hard HEAD~1    Undo last commit, discard changes',
  '  git rebase <branch>        Replay commits onto another branch',
  '  git stash                  Save work-in-progress',
  '  git stash pop              Restore stashed changes',
  '  git cherry-pick <hash>     Copy a commit to current branch',
  '  git log --oneline          Show commit history',
  '  git status                 Show working directory state',
  '  clear                      Clear terminal output',
  '  reset                      Reset scenario to initial state',
  '',
]

export const STATUS_EMPTY = [
  'On branch {branch}',
  'nothing to commit, working tree clean',
]

export const STATUS_WITH_CHANGES = [
  'On branch {branch}',
  'Changes not staged for commit:',
  '  (use "git add <file>..." to update what will be staged)',
  '',
  '{workingDir}',
  '',
  'no changes added to commit',
]

export const STATUS_WITH_STAGED = [
  'On branch {branch}',
  'Changes to be committed:',
  '  (use "git restore --staged <file>..." to unstage)',
  '',
  '{stage}',
  '',
]
