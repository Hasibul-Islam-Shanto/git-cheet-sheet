import type { VisualizerScenario } from '@/types/visualizer'

export const scenarios: VisualizerScenario[] = [
  {
    id: 'branch',
    command: 'git branch',
    title: 'Branching',
    description: 'Create a new line of development without affecting main.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
      ],
      branches: [{ name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' }],
      HEAD: 'main',
      stash: [],
      stage: [],
      workingDir: ['index.html'],
    },
    steps: [
      {
        command: 'git branch feature',
        outputLines: [],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
          ],
          branches: [
            { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
            { name: 'feature', tipHash: 'a3f1b2c', color: '#4fffb0' },
          ],
          HEAD: 'main',
          stash: [],
          stage: [],
          workingDir: ['index.html'],
        },
        explanation:
          'A new branch called "feature" was created at the same commit as main. No files changed — a branch is just a pointer.',
        highlightCommits: ['a3f1b2c'],
      },
      {
        command: 'git switch feature',
        outputLines: ["Switched to branch 'feature'"],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
          ],
          branches: [
            { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
            { name: 'feature', tipHash: 'a3f1b2c', color: '#4fffb0' },
          ],
          HEAD: 'feature',
          stash: [],
          stage: [],
          workingDir: ['index.html'],
        },
        explanation:
          'HEAD now points to the feature branch. Any new commits will be added here, not on main.',
        highlightCommits: [],
      },
      {
        command: 'git commit -m "Add feature"',
        outputLines: ['[feature 9d4e521] Add feature', ' 1 file changed, 5 insertions(+)'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
            { hash: '9d4e521', message: 'Add feature', parentHash: 'a3f1b2c', branch: 'feature' },
          ],
          branches: [
            { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
            { name: 'feature', tipHash: '9d4e521', color: '#4fffb0' },
          ],
          HEAD: 'feature',
          stash: [],
          stage: [],
          workingDir: [],
        },
        explanation:
          'feature is now one commit ahead of main. The two branches have diverged — main is unaffected.',
        highlightCommits: ['9d4e521'],
      },
    ],
  },

  {
    id: 'merge',
    command: 'git merge',
    title: 'Merging',
    description: 'Combine the history of two branches into one.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
        { hash: '9d4e521', message: 'Add feature', parentHash: 'a3f1b2c', branch: 'feature' },
      ],
      branches: [
        { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
        { name: 'feature', tipHash: '9d4e521', color: '#4fffb0' },
      ],
      HEAD: 'main',
      stash: [],
      stage: [],
      workingDir: [],
    },
    steps: [
      {
        command: 'git merge feature',
        outputLines: ['Merge made by the "ort" strategy.', ' feature.js | 5 +++++', ' 1 file changed, 5 insertions(+)'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
            { hash: '9d4e521', message: 'Add feature', parentHash: 'a3f1b2c', branch: 'feature' },
            { hash: 'c8b2e93', message: "Merge branch 'feature'", parentHash: 'a3f1b2c', branch: 'main' },
          ],
          branches: [
            { name: 'main', tipHash: 'c8b2e93', color: '#f7c948' },
            { name: 'feature', tipHash: '9d4e521', color: '#4fffb0' },
          ],
          HEAD: 'main',
          stash: [],
          stage: [],
          workingDir: [],
        },
        explanation:
          'A merge commit was created on main combining both histories. The feature branch still exists — it was not deleted.',
        highlightCommits: ['c8b2e93'],
      },
    ],
  },

  {
    id: 'reset',
    command: 'git reset',
    title: 'Resetting',
    description: 'Move HEAD backward to undo commits.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
        { hash: '9d4e521', message: 'WIP: broken change', parentHash: 'a3f1b2c', branch: 'main' },
      ],
      branches: [{ name: 'main', tipHash: '9d4e521', color: '#f7c948' }],
      HEAD: 'main',
      stash: [],
      stage: [],
      workingDir: [],
    },
    steps: [
      {
        command: 'git reset --soft HEAD~1',
        outputLines: [],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
          ],
          branches: [{ name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' }],
          HEAD: 'main',
          stash: [],
          stage: ['broken-change.js'],
          workingDir: [],
        },
        explanation:
          'The last commit was undone but its changes are still staged, ready to recommit. This is safe — nothing is lost.',
        highlightCommits: ['a3f1b2c'],
      },
      {
        command: 'git reset --hard HEAD~1',
        outputLines: ['HEAD is now at 1bc7830 Initial commit'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
          ],
          branches: [{ name: 'main', tipHash: '1bc7830', color: '#f7c948' }],
          HEAD: 'main',
          stash: [],
          stage: [],
          workingDir: [],
        },
        explanation:
          'HEAD moved back and all changes were discarded. This is destructive — the "Add README" commit is gone.',
        highlightCommits: ['1bc7830'],
      },
    ],
  },

  {
    id: 'rebase',
    command: 'git rebase',
    title: 'Rebasing',
    description: 'Replay your commits on top of another branch for a linear history.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Update config', parentHash: '1bc7830', branch: 'main' },
        { hash: 'b5c2d94', message: 'Start feature', parentHash: '1bc7830', branch: 'feature' },
      ],
      branches: [
        { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
        { name: 'feature', tipHash: 'b5c2d94', color: '#4fffb0' },
      ],
      HEAD: 'feature',
      stash: [],
      stage: [],
      workingDir: [],
    },
    steps: [
      {
        command: 'git rebase main',
        outputLines: [
          'Successfully rebased and updated refs/heads/feature.',
        ],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Update config', parentHash: '1bc7830', branch: 'main' },
            { hash: 'e7f3a12', message: 'Start feature', parentHash: 'a3f1b2c', branch: 'feature' },
          ],
          branches: [
            { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
            { name: 'feature', tipHash: 'e7f3a12', color: '#4fffb0' },
          ],
          HEAD: 'feature',
          stash: [],
          stage: [],
          workingDir: [],
        },
        explanation:
          '"Start feature" was replayed onto main\'s tip. It got a new hash (e7f3a12) because its parent changed. History is now linear.',
        highlightCommits: ['e7f3a12'],
      },
    ],
  },

  {
    id: 'stash',
    command: 'git stash',
    title: 'Stashing',
    description: 'Temporarily save work-in-progress without committing.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
      ],
      branches: [{ name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' }],
      HEAD: 'main',
      stash: [],
      stage: [],
      workingDir: ['index.html', 'style.css'],
    },
    steps: [
      {
        command: 'git stash',
        outputLines: ['Saved working directory and index state WIP on main: a3f1b2c Add README'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
          ],
          branches: [{ name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' }],
          HEAD: 'main',
          stash: [{ hash: 'stash@{0}', message: 'WIP on main: index.html, style.css', parentHash: 'a3f1b2c', branch: 'stash' }],
          stage: [],
          workingDir: [],
        },
        explanation:
          'Your uncommitted changes were saved to the stash stack and the working directory is clean. You can safely switch branches now.',
        highlightCommits: [],
      },
      {
        command: 'git stash pop',
        outputLines: ['On branch main', 'Changes not staged for commit:', '  modified: index.html', '  modified: style.css', 'Dropped stash@{0}'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
          ],
          branches: [{ name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' }],
          HEAD: 'main',
          stash: [],
          stage: [],
          workingDir: ['index.html', 'style.css'],
        },
        explanation:
          'The stashed changes were applied back to the working directory and removed from the stash stack.',
        highlightCommits: [],
      },
    ],
  },

  {
    id: 'cherry-pick',
    command: 'git cherry-pick',
    title: 'Cherry-picking',
    description: 'Copy a specific commit from one branch onto another.',
    initialRepo: {
      commits: [
        { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
        { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
        { hash: '9d4e521', message: 'Fix critical bug', parentHash: 'a3f1b2c', branch: 'feature' },
        { hash: 'b5c2d94', message: 'Add experiment', parentHash: '9d4e521', branch: 'feature' },
      ],
      branches: [
        { name: 'main', tipHash: 'a3f1b2c', color: '#f7c948' },
        { name: 'feature', tipHash: 'b5c2d94', color: '#4fffb0' },
      ],
      HEAD: 'main',
      stash: [],
      stage: [],
      workingDir: [],
    },
    steps: [
      {
        command: 'git cherry-pick 9d4e521',
        outputLines: ['[main f2e8b31] Fix critical bug', ' Date: ...', ' 1 file changed, 3 insertions(+), 1 deletion(-)'],
        repoAfter: {
          commits: [
            { hash: '1bc7830', message: 'Initial commit', parentHash: null, branch: 'main' },
            { hash: 'a3f1b2c', message: 'Add README', parentHash: '1bc7830', branch: 'main' },
            { hash: '9d4e521', message: 'Fix critical bug', parentHash: 'a3f1b2c', branch: 'feature' },
            { hash: 'b5c2d94', message: 'Add experiment', parentHash: '9d4e521', branch: 'feature' },
            { hash: 'f2e8b31', message: 'Fix critical bug', parentHash: 'a3f1b2c', branch: 'main' },
          ],
          branches: [
            { name: 'main', tipHash: 'f2e8b31', color: '#f7c948' },
            { name: 'feature', tipHash: 'b5c2d94', color: '#4fffb0' },
          ],
          HEAD: 'main',
          stash: [],
          stage: [],
          workingDir: [],
        },
        explanation:
          'The bug fix was copied to main as a new commit (f2e8b31). The original commit on feature still exists — cherry-pick copies, not moves.',
        highlightCommits: ['f2e8b31', '9d4e521'],
      },
    ],
  },
]
