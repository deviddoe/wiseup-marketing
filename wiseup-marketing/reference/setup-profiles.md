# Setup profiles - how WM places itself without asking

`wm-init` works this out by reading the environment, then confirms **one** decision with the owner. It never asks a question the filesystem can answer.

## Step 1 - Detect

Run these before asking anything. Every one is read-only.

| Signal | How to read it | Used for |
|---|---|---|
| Git repository? | `.git/` exists | whether ignore rules matter at all |
| Remote and visibility | `gh repo view --json visibility,owner` (skip silently if `gh` is missing or not logged in) | public repo raises the bar for what may be committed |
| Team or solo | distinct authors in `git log --format=%ae \| sort -u \| head`; an organisation owner counts as team | whether shared files may be touched |
| Code repo or empty folder | `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `src/`, `app/` | is WM the tenant or a guest |
| Existing marketing folder | `Marketing/CLAUDE.md`, or `_context/` at the root | update instead of create |
| Local ignore available | `.git/info/exclude` is writable | can hide without touching tracked files |
| `settings.local.json` ignored | `git check-ignore .claude/settings.local.json` | safe place for a personal enablement |
| Product facts | `package.json` name and description, the root `README`, `<title>` in an index page, i18n message files | pre-fill instead of ask |

## Step 2 - Pick the profile

| | **A - Workspace** | **B - Private guest** | **C - Shared guest** |
|---|---|---|---|
| **When** | not a code repo, or a folder dedicated to marketing | code repo, single author, private | code repo that is public, or has more than one author |
| **Marketing folder** | the repository root itself, or `Marketing/` committed with it | `Marketing/`, hidden from git | `Marketing/`, hidden from git; offer a sibling folder instead |
| **Plugin enablement** | `.claude/settings.json` (shared - the team should get it) | `.claude/settings.local.json` (personal, already ignored) | `.claude/settings.local.json` |
| **Ignore rule** | none | `Marketing/` appended to `.git/info/exclude` | same |
| **Tracked files touched** | `.claude/settings.json` only | **none** | **none** |
| **Root `/wm` shortcut** | yes | yes | yes - it lives in the personal settings file |

**C also says this out loud:** a hidden `Marketing/` folder has no history and no backup. Offer a sibling repository - `../<project>-marketing`, private - and let the owner choose. Do not decide it for them.

## Step 3 - Confirm once

One `AskUserQuestion` call. State what was detected in a sentence, name the profile, list the exact file actions, and offer: accept, switch profile, or sibling folder.

> Detected: a public git repository with a Node project and one author. Plan: profile B - create `Marketing/`, hide it from git via `.git/info/exclude`, and enable Wiseup Marketing in `.claude/settings.local.json`. No tracked file is touched, so there is nothing to commit.

## Step 4 - Apply and record

Write `<marketing root>/.wm/setup.json`:

```json
{
  "wm_version": "1.1.0",
  "profile": "B",
  "marketing_root": "Marketing",
  "created": "YYYY-MM-DD",
  "detected": {
    "git": true, "visibility": "public", "authors": 1,
    "project_type": "node", "gh_available": true
  },
  "actions": [
    "created Marketing/",
    "appended 'Marketing/' to .git/info/exclude",
    "enabled wiseup-marketing@wiseup in .claude/settings.local.json"
  ],
  "tracked_files_touched": []
}
```

`wm-doctor` reads this file, and a second `wm-init` run reads it instead of asking again.

## Hard rules for this step

1. **Never modify a tracked file without saying so first.** If a profile requires it, the confirmation names the file and what changes in it.
2. **Never commit anything, ever.** Not even the ignore rule. Leave the working tree for the owner.
3. **Never write a secret** into any file that git can see.
4. If `gh` is missing or the repo has no remote, assume the stricter profile (hide it) and say why.
5. If detection is ambiguous, ask - but ask once, with the options spelled out.
