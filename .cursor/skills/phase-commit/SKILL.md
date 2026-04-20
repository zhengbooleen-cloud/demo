---
name: phase-commit
description: >-
  Commits work after a phase of tasks: inspects git state, creates an
  agent-prefixed feature branch when on mainline branches, runs hook-based
  quality checks, excludes temp artifacts via .gitignore, stages intentionally,
  and commits with a structured conventional message. Use when the user asks to
  commit staged work, finish a phase with a commit, or follow the project’s
  post-task commit workflow (including 阶段性提交、规范提交、agent 分支).
---

# Phase commit (阶段性工作提交)

Apply this workflow when committing after completing a chunk of work. Execute steps in order; do not skip quality gates to “save time”.

## 1. Status check

Run `git status` (and `git branch --show-current` if needed).

**Branch rule:** If the current branch is a **mainline / explicit project branch** (examples: `main`, `master`, `develop`, `dev`, `dev_hly`, or other team default names), **you must** go to **§2 Branch checkout**. If the current branch already starts with `agent-` and matches this task, you may skip §2 unless the user wants a new branch for a new subtask.

## 2. Branch checkout

1. From the task, derive a short **English** branch slug (e.g. `feat/dark-plate-pagination`, `fix/login-redirect`).
2. Prefix with **`agent-`** (e.g. `agent-feat/dark-plate-pagination`).
3. Run: `git checkout -b <branch-name>`.

Use lowercase, hyphens, and slashes consistent with the repo’s branch conventions.

## 3. Pre-commit quality (hooks)

- Run whatever **hooks / pre-commit checks** the project defines (e.g. from `.cursor/hooks.json`, Husky, lint-staged, `npm test`, etc.).
- **If this workflow already ran the same checks in this session**, do not duplicate unnecessarily; otherwise run them before staging the commit.
- On failure: **stop** the commit flow, fix the code or config, re-run until green.

## 4. Temp files and garbage

- Do **not** `git add` build artifacts, logs, editor swap files, `target/`, `node_modules/`, `.env` secrets, or other **temporary / generated** paths unless the project explicitly tracks them.
- If such files appear in `git status` and belong ignored: add appropriate patterns to **`.gitignore`** (project root or subpackage), then verify they no longer show as trackable additions.

## 5. Stage

Run `git add` **only** for files that should be part of this commit. Prefer explicit paths over `git add .` when the working tree mixes unrelated changes.

## 6. Commit message (严格生成规范)

Before executing `git commit`, you must first output your reasoning in chat:

- **分析 Diff**：具体修改了哪些核心逻辑（排除格式化、纯 import 调整等噪音）。
- **提炼意图**：本次修改在业务上解决了什么问题（例如：计算换手率、实现暗盘分页）。
- **严格套用格式**：`<type>(<scope>): <简明扼要的动作与结果描述>`。

Message format constraints:

- **type**: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, etc.
- **scope**: module or area (e.g. `capital`, `router`, `api`).
- The subject must include action + affected scope + concrete result.

Examples:

- **反面教材（禁止）**：`feat(capital): update java and vue` (too vague, no concrete information)
- **正面教材（参考）**：`feat(capital): 后端新增主力资金占比 percentage 字段并在前端 FeaturedQuotes 接入显示`

Permission gate:

- You must present reasoning + candidate message first.
- Only after user approval (or explicit silent acceptance requested by user) can you run:

```bash
git commit -m "<subject>"
```

## Checklist

- [ ] `git status` reviewed; branch rule applied (mainline → new `agent-…` branch).
- [ ] Hooks / quality checks passed (or fixed and re-run).
- [ ] No junk or secrets staged; `.gitignore` updated if needed.
- [ ] Staged files are intentional; message matches **type(scope): 动作 + 范围 + 改动**.
