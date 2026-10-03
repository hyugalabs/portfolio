<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Session workflow

- Start every session by reading `memory.md` (status, decisions, open questions) and `hyugalabs-tasks.md` (what we're building).
- "Implement task N" or "implement `<feature>`" means work from `hyugalabs-tasks.md`. Check the task's dependencies are done before starting.
- Update `memory.md` Status after finishing each task.
- Do not build backlog items unless the user asks.
- Follow the design direction in `hyugalabs-tasks.md` (60-30-10 for color and fonts).

# CodeGraph

This repo is indexed by CodeGraph (`.codegraph/` directory at the repo root). Before using grep/find or reading files to understand or locate code, reach for CodeGraph first:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.
