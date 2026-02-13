# Repository Guidelines

- Package: `azura` — a Chainlink CRE workflow CLI and SDK
- Runtime baseline: Node **22+** (ESM only)

## Project Structure

- **Source code:** `src/` — CLI entry in `src/entry.ts`, banner in `src/cli/`, terminal theme in `src/terminal/`, ASCII art in `src/ascii.ts`, library surface in `src/index.ts`
- **Workflows:** each CRE workflow lives in its own top-level subdirectory (e.g. `my-workflow/`) containing `main.ts`, `workflow.yaml`, `package.json`, and `tsconfig.json`
- **Project config:** `project.yaml` (shared CRE settings), `secrets.yaml` (secret-to-env mappings), `.env` (private keys / API keys — never committed)
- **Contracts:** `contracts/` (Solidity sources, ABIs, Foundry project)
- **Build output:** `dist/` (TypeScript compiled via `tsc`)
- **Bin entry:** `azura.mjs` (shebang wrapper → `dist/entry.js`)
- **Tests:** colocated `*.test.ts` alongside source files

## Build, Test, and Development Commands

- Install deps: `npm install`
- Type-check / build: `npx tsc`
- Run CLI in dev: `node azura.mjs`
- Run via npx: `npx azura`
- CRE CLI (requires `~/.cre/bin` on PATH):
  - Init new project: `cre init`
  - Simulate workflow: `cre workflow simulate <workflow-folder>`
  - Deploy workflow: `cre workflow deploy <workflow-folder>`
  - Manage secrets: `cre secrets create|update|delete|list`
  - Generate bindings: `cre generate-bindings evm`
  - Login / auth: `cre login`, `cre whoami`

## Coding Style & Naming Conventions

- Language: TypeScript (ESM). Prefer strict typing; avoid `any` and `unknown` unless absolutely necessary.
- Use **Azura** for product/app/docs headings; use `azura` for CLI command, package name, binary, paths, and config keys.
- Theme color: purple `#B24BF3` — used in banner, CLI output, and branding.
- Aim to keep files under ~500 LOC; split/refactor when it improves clarity or testability.

## Dependencies

- Direct imports in `src/`: `chalk`
- CRE workflow code uses: `@chainlink/cre-sdk`
- Do not add dependencies unless `src/` or workflow code directly imports them

## CRE Workflow Conventions

- Every workflow folder must contain: `main.ts`, `workflow.yaml`, `package.json`, `tsconfig.json`
- Workflow code follows the handler pattern: `cre.handler(trigger, callback)`
- Triggers: HTTP (`HttpTrigger`), Cron, EVM Log
- Capabilities: `HttpClient` (fetch external data), EVM Client (read/write chain state), Consensus
- Targets in `workflow.yaml` and `project.yaml` must match; select with `--target` flag or `CRE_TARGET` env
- Secrets go in `secrets.yaml`; actual values in `.env` (never committed)
- Simulate before deploying: `cre workflow simulate <folder>`
- Deploy: `cre workflow deploy <folder>` (compiles to WASM, uploads, registers on-chain)

## Testing Guidelines

- Run `cre workflow simulate <folder>` to validate workflow logic locally
- Use `--broadcast` flag to test with real testnet transactions
- Use `--engine-logs` for detailed execution tracing
- Unit tests for SDK/CLI code use colocated `*.test.ts` files

## Commit & Pull Request Guidelines

- Follow concise, action-oriented commit messages (e.g., `azura: add price-feed workflow`)
- Group related changes; avoid bundling unrelated refactors
- PRs should summarize scope, note testing performed, and mention any user-facing changes

## Security & Configuration

- Never commit real secrets, private keys, or API keys
- `.env` is gitignored — contains `CRE_ETH_PRIVATE_KEY`, API keys, etc.
- Use obviously fake placeholders in docs, tests, and examples
- Secrets for CRE workflows are managed via `cre secrets create|update` (stored in Vault DON)
