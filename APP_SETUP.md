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

This scaffolds the base CRE project. With workflows and contracts added, the full structure is:

```
azura/
├── contracts/
│   ├── abi/            # TypeScript ABI stubs
│   ├── src/            # Solidity contracts
│   ├── script/         # Foundry deploy scripts
│   ├── test/           # Foundry tests
│   ├── lib/            # Dependencies (forge-std, openzeppelin-contracts)
│   └── foundry.toml    # Foundry config
├── treasury-workflow/
│   ├── main.ts         # Workflow entry point
│   ├── report.ts       # Report builder + encoder
│   ├── readers.ts      # On-chain balance readers
│   ├── fetchers.ts     # External API fetchers
│   ├── writer.ts       # On-chain report writer
│   ├── types.ts        # TypeScript types
│   ├── workflow.yaml   # Target settings
│   ├── config.staging.json
│   ├── config.production.json
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

### Foundry Project Structure

The Solidity contracts live in `azura/contracts/` alongside the TypeScript ABI stubs:

```
azura/contracts/
├── abi/                              # TypeScript ABI stubs (used by workflows)
│   ├── index.ts
│   ├── AzuraToken.ts
│   ├── AzuraTreasury.ts
│   ├── AzuraTreasuryProxy.ts
│   └── ...
├── src/                              # Solidity source contracts
│   ├── AzuraToken.sol                # ERC20 + Ownable, mint/burn
│   ├── AzuraTreasury.sol             # Treasury report storage, proxy auth
│   └── AzuraTreasuryProxy.sol        # CRE IReceiver, metadata validation
├── script/
│   └── Deploy.s.sol                  # Foundry deploy script (all 3 contracts)
├── test/
│   └── AzuraTreasury.t.sol           # Foundry tests (11 tests)
├── lib/
│   ├── forge-std/
│   └── openzeppelin-contracts/
├── foundry.toml                      # Foundry config (Solc 0.8.24, OZ remappings)
├── broadcast/                        # Deploy transaction logs (auto-generated)
└── out/                              # Compiled artifacts (auto-generated)
```

### Contracts Overview

| Contract | Solidity | Description |
|----------|----------|-------------|
| `AzuraToken` | `src/AzuraToken.sol` | ERC20 with `Ownable`. Owner can `mint(to, amount)`, anyone can `burn(amount)` their own tokens. Constructor: `(name, symbol, initialSupply)` |
| `AzuraTreasury` | `src/AzuraTreasury.sol` | Stores `TreasuryReport` struct on-chain. Only callable by authorized proxy or owner. Exposes `updateReserves()`, `getLatestReport()`, `getBackingRatio()`, `getTotalValue()`, `lastUpdated()` |
| `AzuraTreasuryProxy` | `src/AzuraTreasuryProxy.sol` | Implements `IReceiver.onReport()`. Decodes CRE metadata (executionId, workflowOwner, workflowName), validates author and workflow name, then forwards decoded `TreasuryReport` to `AzuraTreasury.updateReserves()` |

### Deployed Addresses (Sepolia)

| Contract | Address |
|----------|---------|
| **AzuraToken** | `0x31E56aC35E34aAD04707e9Bf75E3D7f3d8F5bE44` |
| **AzuraTreasury** | `0x4DdE462B7e36Ee1516A2B46c045b83C8d504B951` |
| **AzuraTreasuryProxy** | `0xac32FeFF6aF183d6beBb7426aBcC310DfF36c8D4` |
| **Deployer** | `0x68692C6E2Ec8D49Dc0a9C5f175CB9b8338e691A4` |

### Onchain Write Pattern

CRE uses a two-step write pattern:
1. **Workflow** generates a cryptographically signed report via `runtime.report()`
2. **Proxy contract** (`AzuraTreasuryProxy`) receives the report via `onReport()`, validates the CRE metadata (author address + workflow name), then forwards the decoded `TreasuryReport` to `AzuraTreasury.updateReserves()`

This ensures all onchain writes are consensus-verified by the DON before execution.

### Build and Test Contracts

```bash
cd azura/contracts

# Build
forge build

# Run tests (11 tests covering token, treasury, proxy, auth, events)
forge test -v
```

### Deploy Contracts (Foundry)

The deploy script (`script/Deploy.s.sol`) deploys all 3 contracts and wires the proxy authorization:

```bash
cd azura/contracts
DEPLOYER_PRIVATE_KEY=0x... forge script script/Deploy.s.sol \
  --rpc-url https://ethereum-sepolia-rpc.publicnode.com \
  --broadcast
```

Deploy order:
1. `AzuraToken("Azura", "AZURA", 1_000_000e18)` — mints initial supply to deployer
2. `AzuraTreasury(deployer)` — deployer as initial authorized caller
3. `AzuraTreasuryProxy(treasuryAddr, deployer, workflowName)` — CRE report receiver
4. `AzuraTreasury.setProxy(proxyAddr)` — authorize the proxy contract

### Generate Go Bindings from ABI

```bash
# Place ABI files in contracts/evm/src/abi/
cre generate-bindings evm
```

Generates Go binding packages in `generated/` (one subdirectory per contract).

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

## Treasury Workflow

The Treasury Workflow (`azura/treasury-workflow/`) is a multi-asset proof-of-reserves workflow that aggregates crypto and RWA holdings, computes a backing ratio for the Azura token, and writes consensus-signed reports on-chain.

### Asset Types

| Enum | Value | Asset | Price Source |
|------|-------|-------|-------------|
| `BTC` | 0 | Bitcoin (WBTC) | CoinGecko |
| `ETH` | 1 | Ethereum (WETH + native) | CoinGecko |
| `XAU` | 2 | Gold | metals.dev |
| `XAG` | 3 | Silver | metals.dev |
| `XPT` | 4 | Platinum | metals.dev |
| `XPD` | 5 | Palladium | metals.dev |

### Config Schema

```json
{
  "schedule": "0 */5 * * * *",
  "metalsPriceUrl": "https://api.metals.dev/v1/latest?api_key=KEY&currency=USD&unit=toz",
  "cryptoPriceUrl": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
  "rwaHoldings": [
    { "assetType": 2, "symbol": "XAU", "reserveUnits": 100.0, "decimals": 18 }
  ],
  "chainSelectorName": "ethereum-testnet-sepolia",
  "gasLimit": "1500000",
  "wbtcAddress": "0x...",
  "wethAddress": "0x...",
  "treasuryWallet": "0x...",
  "balanceReaderAddress": "0x...",
  "azuraTokenAddress": "0x...",
  "treasuryProxyAddress": "0x..."
}
```

- `rwaHoldings[].reserveUnits` — off-chain attested quantity (e.g., 100 troy ounces of gold)
- Crypto balances (BTC, ETH) are read directly from chain via `balanceOf` and `BalanceReader`
- All USD values and the backing ratio use 18-decimal fixed-point precision

### Contracts

All three contracts are deployed to Sepolia (see [Smart Contract Integration](#smart-contract-integration) for addresses):

| Contract | Solidity | Purpose |
|----------|----------|---------|
| `AzuraToken` | `contracts/src/AzuraToken.sol` | ERC20 token with mint/burn (extends IERC20) |
| `AzuraTreasury` | `contracts/src/AzuraTreasury.sol` | Stores treasury reports (`updateReserves`, `getLatestReport`, `getBackingRatio`) |
| `AzuraTreasuryProxy` | `contracts/src/AzuraTreasuryProxy.sol` | CRE report receiver (`onReport`) — validates workflow author and forwards to AzuraTreasury |

### Simulation

```bash
# Install dependencies
bun install --cwd azura/treasury-workflow

# Simulate against deployed Sepolia contracts
cre workflow simulate azura/treasury-workflow --target staging-settings --engine-logs

# Simulate with broadcast (submits real transactions)
cre workflow simulate azura/treasury-workflow --target staging-settings --broadcast
```

### Deployment

```bash
cre workflow deploy azura/treasury-workflow --target staging-settings
cre workflow activate azura/treasury-workflow --target staging-settings
```

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
