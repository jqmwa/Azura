# Azura Treasury Workflow

Multi-asset treasury proof-of-reserves workflow for the Azura token. Periodically aggregates crypto and RWA holdings, computes a total treasury value and backing ratio, then writes a consensus-signed report on-chain.

## Asset Coverage

| Asset | Type | Source |
|-------|------|--------|
| BTC | Crypto | WBTC `balanceOf` on-chain + CoinGecko price |
| ETH | Crypto | WETH `balanceOf` + native ETH via BalanceReader + CoinGecko price |
| XAU (Gold) | RWA | Config-attested quantity + metals.dev price |
| XAG (Silver) | RWA | Config-attested quantity + metals.dev price |
| XPT (Platinum) | RWA | Config-attested quantity + metals.dev price |
| XPD (Palladium) | RWA | Config-attested quantity + metals.dev price |

## Data Flow

```
Cron Trigger (every 5 min staging / 15 min production)
  │
  ├─ Fetch metal prices (XAU, XAG, XPT, XPD) from metals.dev
  ├─ Fetch crypto prices (BTC, ETH) from CoinGecko
  │
  ├─ Read WBTC balanceOf(treasuryWallet) on-chain
  ├─ Read WETH balanceOf(treasuryWallet) on-chain
  ├─ Read native ETH balance via BalanceReader
  ├─ Read Azura token totalSupply() on-chain
  │
  ├─ Aggregate holdings → total USD value → backing ratio
  ├─ Generate consensus-signed report
  └─ Write report to AzuraTreasuryProxy on Sepolia
```

## Configuration

See `config.staging.json` for the full schema. Key fields:

- `schedule` — cron expression for trigger frequency
- `metalsPriceUrl` — metals.dev API endpoint (requires API key)
- `cryptoPriceUrl` — CoinGecko simple price endpoint
- `rwaHoldings[]` — off-chain attested RWA quantities (assetType, symbol, reserveUnits, decimals)
- `chainSelectorName` — target chain (`ethereum-testnet-sepolia`)
- Contract addresses: `wbtcAddress`, `wethAddress`, `treasuryWallet`, `balanceReaderAddress`, `azuraTokenAddress`, `treasuryProxyAddress`

## Setup

```bash
# Install dependencies
bun install --cwd azura/treasury-workflow

# Update config with deployed contract addresses
# Edit config.staging.json with real addresses

# Simulate (validates compilation + HTTP fetches)
cre workflow simulate azura/treasury-workflow --target staging-settings --engine-logs

# After contract deployment, simulate with broadcast
cre workflow simulate azura/treasury-workflow --target staging-settings --broadcast
```

## File Structure

| File | Purpose |
|------|---------|
| `main.ts` | Zod config schema, workflow init, cron handler |
| `types.ts` | AssetType enum, TreasuryHolding/TreasuryReport interfaces |
| `fetchers.ts` | HTTP fetchers for metal and crypto prices with consensus |
| `readers.ts` | On-chain EVM reads for token balances and supply |
| `report.ts` | Report builder (aggregation + ABI encoding) |
| `writer.ts` | Consensus report generation + on-chain write |
