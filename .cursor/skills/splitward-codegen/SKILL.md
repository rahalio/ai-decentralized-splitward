---
name: splitward-codegen
description: >-
  Splitward OpenAPI-first DDD codegen conventions: @splitward package scope,
  never commit .codegen, Mode A full generate for new domains and Mode B
  core-only after YAML edits. Use when working on Splitward OpenAPI, codegen,
  or platform layers.
---

# Splitward codegen

## HARD RULE — never commit `.codegen`

The Python `zero-codegen` tool lives in `.codegen/` for local use only.

- **Never** commit or push `.codegen/` to GitHub.
- It is gitignored; do not force-add it.
- Bootstrap after clone: copy `.codegen` from `zero-apps-codegen-scaffold`, then `pnpm codegen:paths`.

## Package scope

All packages use `@splitward/*` (`openapi-core`, `core`, `services`, `adapters`, `api-server`, `tests`, `webapp`).

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First scaffold | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain exists | Bundle → `--layers core` → handwrite platform |

Also see `ddd-platform`, `ddd-codegen`, and `ddd-identity` skills.
