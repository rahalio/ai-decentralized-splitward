# Splitward

Multi-hospital **split-learning control plane** — train shared nets without exchanging raw patient data. OpenAPI-first DDD monorepo based on the zero-apps codegen scaffold.

**Product specs:** [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  →  generated clients + product UI
```

Package scope: **`@splitward/*`**

## Quick start

```bash
# After clone: restore .codegen from zero-apps-codegen-scaffold (gitignored)
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: splitward_demo_local_dev_key

# Web app (Vite) — proxies /v0 to the API
pnpm dev:web
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=splitward-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — local tool only; see `.cursor/rules/codegen-never-commit.mdc`.

See `.cursor/skills/` and `docs/CODEGEN.md`.
