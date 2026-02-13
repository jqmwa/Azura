## Table of Contents

1. [Prerequisites](#prerequisites)
2. [CRE CLI -- Installation](#cre-cli----installation)
3. [Project Initialization](#project-initialization)
4. [Environment Configuration](#environment-configuration)
5. [Workflow Structure](#workflow-structure)
6. [Project Configuration Files](#project-configuration-files)
7. [Building and Running the CLI](#building-and-running-the-cli)
8. [Simulating Workflows](#simulating-workflows)
9. [Deploying Workflows](#deploying-workflows)
10. [Secrets Management](#secrets-management)
11. [Smart Contract Integration](#smart-contract-integration)
12. [CRE CLI Command Reference](#cre-cli-command-reference)
13. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js >= 22
- Bun >= 1.0 (for CRE workflow dependencies)
- CRE CLI v1.0.10+ (installed below)
- Foundry toolkit (for Solidity contract deployment)
- An Ethereum wallet with Sepolia testnet ETH
- (Optional) Go >= 1.25.3 for Go-based CRE workflows

---

## CRE CLI -- Installation

The CRE CLI (`cre`) manages workflow compilation, simulation, and deployment to the Chainlink Runtime Environment.

### Install

```bash
curl -sSL https://cre.chain.link/install.sh | bash
```

This installs `cre` to `~/.cre/cre` and adds `~/.cre/bin` to your PATH in `~/.zshrc`.

### Reload Shell

```bash
exec /bin/zsh
```

### Verify

```bash
cre version
# cre version v1.0.10
```

### Update

```bash
cre update
```

### Authenticate

```bash
cre login
cre whoami
```

You must be logged in before deploying workflows or managing secrets.

---

## Project Initialization

### Option A: Initialize a New CRE Project

```bash
cre init --project-name azura --workflow-name my-workflow
```

This scaffolds:

```
azura/
├── my-workflow/
│   ├── main.ts
│   ├── workflow.yaml
│   ├── package.json
│   └── tsconfig.json
├── project.yaml
├── secrets.yaml
└── .env
```

### Option B: Add a Workflow to the Existing Azura Repo

Run `cre init` from the project root and specify a new workflow name:

```bash
cd /path/to/azura
cre init --workflow-name price-feed
```

This creates a `price-feed/` subdirectory with starter workflow files alongside the existing CLI source in `src/`.

---

## Environment Configuration

### .env File

Create a `.env` in the project root (gitignored):

```bash
# Ethereum private key for workflow deployment and onchain writes
CRE_ETH_PRIVATE_KEY=0x_YOUR_PRIVATE_KEY_HERE

# RPC endpoint for Sepolia testnet
CRE_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# (Optional) External API keys used by workflows
GEMINI_API_KEY=your-api-key-here
```

**NEVER** commit `.env`. Add it to `.gitignore`.

### secrets.yaml

Maps logical secret names (used in workflow code) to environment variable names:

```yaml
simulation:
  eth_private_key:
    env_var: CRE_ETH_PRIVATE_KEY
  api_key:
    env_var: GEMINI_API_KEY

staging:
  eth_private_key:
    env_var: CRE_ETH_PRIVATE_KEY
  api_key:
    env_var: GEMINI_API_KEY
```

This decouples your workflow code from specific env var names.

---

## Workflow Structure

Each CRE workflow lives in its own subdirectory:

```
my-workflow/
├── main.ts          # Workflow entry point (handler + trigger + callback)
├── workflow.yaml    # Workflow-specific configuration and targets
├── package.json     # Dependencies (includes @chainlink/cre-sdk)
├── tsconfig.json    # TypeScript config for this workflow
└── config.staging.json  # (Optional) target-specific runtime config
```

### main.ts -- Anatomy of a Workflow

```typescript
import { Workflow, HttpTrigger, HttpClient } from "@chainlink/cre-sdk";

// 1. Define the trigger
const trigger = new HttpTrigger({ path: "/execute" });

// 2. Define the callback (your business logic)
async function callback(request, context) {
  const client = new HttpClient();
  const response = await client.sendRequest({
    method: "GET",
    url: "https://api.example.com/data",
    headers: { "Content-Type": "application/json" },
  });
  // Process data, write onchain, etc.
  return response;
}

// 3. Wire trigger to callback
const workflow = new Workflow({
  triggers: [trigger],
});

workflow.onHttpRequest(callback);

export default workflow;
```

### Trigger Types

| Trigger | Use Case | Activation |
|---------|----------|------------|
| **HTTP** | API-driven execution | External POST/GET request |
| **Cron** | Scheduled execution | Cron expression (e.g. `0 * * * *`) |
| **EVM Log** | Event-driven execution | Smart contract event emission |

### Capabilities Available in Callbacks

| Capability | What It Does |
|-----------|--------------|
| **HttpClient** | Fetch external data (REST APIs, oracles) |
| **Confidential HttpClient** | Fetch with secret headers (API keys) |
| **EVM Client (read)** | Read smart contract state |
| **EVM Client (write)** | Generate signed reports for onchain submission |
| **Consensus** | Multi-node agreement on computation results |

---

## Project Configuration Files

### project.yaml

Top-level shared configuration for all workflows in the project:

```yaml
version: "1.0"
name: azura
description: Azura CRE workflow project

# Target definitions shared across workflows
simulation:
  rpc_url: http://localhost:8545

staging:
  rpc_url: https://sepolia.infura.io/v3/YOUR_PROJECT_ID
  chain_id: 11155111

production:
  rpc_url: https://mainnet.infura.io/v3/YOUR_PROJECT_ID
  chain_id: 1
```

### workflow.yaml

Per-workflow configuration:

```yaml
# Targets must exist in both project.yaml and workflow.yaml
simulation:
  config_path: ./config.simulation.json

staging:
  config_path: ./config.staging.json
```

### Target Selection

```bash
# Via CLI flag
cre workflow simulate my-workflow --target staging

# Via environment variable
CRE_TARGET=staging cre workflow simulate my-workflow
```

If your workflow directory contains a `workflow.yaml`, the target you specify must exist in **both** `project.yaml` and `workflow.yaml`.

---

## Building and Running the CLI

### Build TypeScript

```bash
npx tsc
```

Compiles `src/` to `dist/`.

### Run Locally

```bash
node azura.mjs
```

Prints the Azura eyes ASCII banner in purple, followed by version info.

### Run via npx (after publishing)

```bash
npx azura
```

### Entry Point Chain

```
azura.mjs (bin shebang)
  → enables compile cache
  → imports dist/entry.js
    → reads package.json version
    → calls emitCliBanner(version)
      → guards: double-emit, non-TTY, --json, --version
      → prints ASCII art in #B24BF3 purple
      → prints "Azura v0.0.1 (dev)"
```

---

## Simulating Workflows

Simulation runs your workflow locally with real API calls and optional testnet transactions.

### Basic Simulation

```bash
cre workflow simulate my-workflow
```

Interactive mode presents a trigger selection menu.

### Non-Interactive Simulation

```bash
# HTTP trigger with payload
cre workflow simulate my-workflow --http-payload '{"key": "value"}' --non-interactive --trigger-index 0

# EVM log trigger
cre workflow simulate my-workflow --evm-tx-hash 0x... --evm-event-index 0 --non-interactive --trigger-index 1
```

### Broadcast to Testnet

```bash
cre workflow simulate my-workflow --broadcast
```

Submits real transactions to the configured testnet. Without `--broadcast`, onchain writes are dry-run only.

### Debug Flags

```bash
# Show internal engine execution logs
cre workflow simulate my-workflow --engine-logs

# Verbose output
cre workflow simulate my-workflow --verbose
```

### Simulation Output

1. Compilation confirmation (WASM build)
2. Trigger selection (interactive) or auto-select (non-interactive)
3. User logs from your workflow code
4. Execution result (success/failure)
5. Transaction details (if `--broadcast`)

---

## Deploying Workflows

Deployment compiles your workflow to WASM, uploads artifacts, and registers on the Workflow Registry contract.

### Prerequisites

- `cre login` completed
- `CRE_ETH_PRIVATE_KEY` set in `.env`
- Account linked: `cre account link-key`

### Deploy

```bash
cre workflow deploy my-workflow
```

This:
1. Compiles TypeScript to WASM binary (`binary.wasm.br.b64`)
2. Uploads the binary
3. Registers the workflow on the Workflow Registry contract
4. Auto-links your account if not already linked

### Deploy Flags

```bash
# Save compiled binary to custom path
cre workflow deploy my-workflow --output ./build/my-workflow.wasm.br.b64

# Skip confirmation prompt
cre workflow deploy my-workflow --yes

# Generate unsigned transaction (for multisig)
cre workflow deploy my-workflow --unsigned

# Use specific target
cre workflow deploy my-workflow --target production
```

### Post-Deploy Lifecycle

```bash
# Activate a deployed workflow
cre workflow activate my-workflow

# Pause a running workflow
cre workflow pause my-workflow

# Delete all versions
cre workflow delete my-workflow
```

---

## Secrets Management

CRE secrets are stored in the Vault DON (Decentralized Oracle Network), not in your repo.

### Create Secrets

```bash
cre secrets create secrets.yaml
```

Reads your `secrets.yaml`, resolves env vars from `.env`, and uploads encrypted values to the Vault DON.

### Update Secrets

```bash
cre secrets update secrets.yaml
```

### Delete Secrets

```bash
cre secrets delete secrets.yaml
```

### List Secrets

```bash
cre secrets list
```

Lists secret identifiers for the current owner address.

### Multisig Workflow

```bash
# Step 1: Generate unsigned bundle
cre secrets create secrets.yaml --unsigned

# Step 2: Execute after multisig approval
cre secrets execute bundle.json
```

---

## Smart Contract Integration

### Generate Go Bindings from ABI

```bash
# Place ABI files in contracts/evm/src/abi/
cre generate-bindings evm
```

Generates Go binding packages in `generated/` (one subdirectory per contract).

### Onchain Write Pattern

CRE uses a two-step write pattern:
1. **Workflow** generates a cryptographically signed report
2. **Consumer contract** receives the report, verifies the signature, and processes the data

This ensures all onchain writes are consensus-verified by the DON before execution.

### Deploy Contracts (Foundry)

```bash
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url $CRE_RPC_URL --broadcast
```

---

## CRE CLI Command Reference

| Command | Description |
|---------|-------------|
| `cre init` | Initialize a new project or add a workflow |
| `cre login` | Authenticate with Chainlink |
| `cre logout` | Revoke auth tokens |
| `cre whoami` | Show current account |
| `cre account link-key` | Link a public key to your account |
| `cre account list-key` | List linked workflow owners |
| `cre account unlink-key` | Unlink a public key |
| `cre workflow simulate <path>` | Simulate a workflow locally |
| `cre workflow deploy <path>` | Deploy a workflow to the registry |
| `cre workflow activate <path>` | Activate a deployed workflow |
| `cre workflow pause <path>` | Pause a running workflow |
| `cre workflow delete <path>` | Delete all versions of a workflow |
| `cre secrets create <file>` | Upload secrets to Vault DON |
| `cre secrets update <file>` | Update existing secrets |
| `cre secrets delete <file>` | Delete secrets |
| `cre secrets list` | List secret identifiers |
| `cre secrets execute <file>` | Execute a prepared multisig bundle |
| `cre generate-bindings evm` | Generate Go bindings from contract ABIs |
| `cre update` | Update CRE CLI to latest version |
| `cre version` | Print CLI version |

### Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--env <path>` | `-e` | Path to `.env` file (default: `.env`) |
| `--project-root <path>` | `-R` | Path to the project root |
| `--target <name>` | `-T` | Use target settings from YAML config |
| `--verbose` | `-v` | Verbose output |

---

## Troubleshooting

### "cre: command not found"

CRE installs to `~/.cre/bin`. Reload your shell:

```bash
exec /bin/zsh
```

Or manually add to PATH:

```bash
export PATH="$HOME/.cre/bin:$PATH"
```

### "go is not installed" Warning

Only needed if building Go-based workflows. TypeScript workflows require Bun, not Go.

### Simulation Fails with "No trigger found"

Ensure your `main.ts` exports a default workflow with at least one registered handler. Check that `--trigger-index` matches an existing handler (0-based).

### Deploy Fails with "Account not linked"

Link your key first:

```bash
cre account link-key
```

### Deploy Fails with "Insufficient funds"

Your `CRE_ETH_PRIVATE_KEY` wallet needs Sepolia ETH to pay for the registry transaction. Get testnet ETH from a faucet.

### "Target not found in project.yaml"

Targets must be defined in **both** `project.yaml` (project-level) and `workflow.yaml` (workflow-level). Ensure the target name matches exactly.

### Secrets Upload Fails

- Verify `cre login` is active: `cre whoami`
- Verify `.env` contains all env vars referenced in `secrets.yaml`
- Check `--timeout` if the operation is slow (default: 48h)

### TypeScript Compilation Errors in Workflow

Ensure the workflow `package.json` includes `@chainlink/cre-sdk` and run `bun install` in the workflow directory.

### Banner Not Printing

- The terminal must be a TTY (`process.stdout.isTTY`)
- `--json` and `--version` flags suppress the banner
- The banner only prints once per process (double-emit guard)
