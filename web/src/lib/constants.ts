export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "home" as const },
  { label: "Workflows", href: "/dashboard/workflows", icon: "workflow" as const },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" as const },
] as const;

export const FEATURES = [
  {
    icon: "workflow" as const,
    title: "Automated Workflows",
    description:
      "Define treasury operations as code. Schedule payments, rebalancing, and conditional transfers with CRE triggers.",
  },
  {
    icon: "crosschain" as const,
    title: "Cross-Chain Native",
    description:
      "Move assets across chains seamlessly with Chainlink CCIP. One workflow, multiple networks.",
  },
  {
    icon: "code" as const,
    title: "Developer-First",
    description:
      "CLI + SDK tooling designed for engineers. npx azura to start. No enterprise sales process.",
  },
  {
    icon: "shield" as const,
    title: "Chainlink-Secured",
    description:
      "Powered by Chainlink's decentralized oracle network. Enterprise-grade security without the enterprise.",
  },
  {
    icon: "monitor" as const,
    title: "Real-Time Monitoring",
    description:
      "Track workflow health, transaction status, and portfolio state in a unified dashboard.",
  },
  {
    icon: "globe" as const,
    title: "Open Infrastructure",
    description:
      "Fully open-source, self-serve, and composable. Build on top of Azura without permission.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Write",
    description: "Define your treasury workflow in TypeScript using the Azura SDK.",
    code: `import { Azura } from "azura";

const workflow = Azura.workflow("weekly-payroll")
  .trigger("cron", "0 9 * * FRI")
  .action("transfer", {
    token: "USDC",
    recipients: payroll,
    chain: "base",
  });`,
  },
  {
    step: 2,
    title: "Simulate",
    description: "Test your workflow against forked mainnet state before deploying.",
    code: `$ npx azura simulate weekly-payroll

✓ Forking Base mainnet at block 24,891,032
✓ Simulating 12 transfers...
✓ Total: 45,000 USDC → 12 recipients
✓ Estimated gas: 0.003 ETH
✓ All transfers validated`,
  },
  {
    step: 3,
    title: "Deploy",
    description: "Deploy to Chainlink CRE and monitor execution in real time.",
    code: `$ npx azura deploy weekly-payroll --network base

✓ Workflow registered with CRE
✓ Trigger configured: Fridays 9:00 UTC
✓ Monitoring dashboard: azura.dev/d/0x1a2b
✓ Next execution: Friday, Jan 10 09:00 UTC`,
  },
] as const;

export const COMPARISON_DIMENSIONS = [
  { key: "selfServe", label: "Self-Serve" },
  { key: "programmable", label: "Programmable" },
  { key: "automated", label: "Automated Workflows" },
  { key: "crossChain", label: "Cross-Chain Native" },
  { key: "devFirst", label: "Developer-First" },
  { key: "openInfra", label: "Open Infrastructure" },
  { key: "monitoring", label: "Real-Time Monitoring" },
] as const;

export const COMPETITORS = [
  {
    name: "Safe",
    values: {
      selfServe: true,
      programmable: false,
      automated: false,
      crossChain: "partial",
      devFirst: false,
      openInfra: true,
      monitoring: "partial",
    },
  },
  {
    name: "Fireblocks",
    values: {
      selfServe: false,
      programmable: "partial",
      automated: "partial",
      crossChain: true,
      devFirst: false,
      openInfra: false,
      monitoring: true,
    },
  },
  {
    name: "Llama",
    values: {
      selfServe: false,
      programmable: false,
      automated: false,
      crossChain: false,
      devFirst: false,
      openInfra: "partial",
      monitoring: false,
    },
  },
  {
    name: "Parcel",
    values: {
      selfServe: true,
      programmable: false,
      automated: "partial",
      crossChain: "partial",
      devFirst: false,
      openInfra: false,
      monitoring: "partial",
    },
  },
  {
    name: "Request",
    values: {
      selfServe: true,
      programmable: false,
      automated: false,
      crossChain: "partial",
      devFirst: false,
      openInfra: false,
      monitoring: "partial",
    },
  },
] as const;

export const AZURA_VALUES = {
  selfServe: true,
  programmable: true,
  automated: true,
  crossChain: true,
  devFirst: true,
  openInfra: true,
  monitoring: true,
} as const;

export const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Developers: [
    { label: "Getting Started", href: "#" },
    { label: "SDK Reference", href: "#" },
    { label: "CLI Docs", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;

export const MOCK_TRANSACTIONS = [
  {
    id: "1",
    type: "Transfer",
    status: "confirmed" as const,
    hash: "0x1a2b…3c4d",
    amount: "5,000 USDC",
    chain: "base" as const,
    time: "2 min ago",
  },
  {
    id: "2",
    type: "Swap",
    status: "confirmed" as const,
    hash: "0x5e6f…7a8b",
    amount: "1.5 ETH",
    chain: "ethereum" as const,
    time: "15 min ago",
  },
  {
    id: "3",
    type: "Bridge",
    status: "pending" as const,
    hash: "0x9c0d…1e2f",
    amount: "10,000 USDC",
    chain: "arbitrum" as const,
    time: "32 min ago",
  },
  {
    id: "4",
    type: "Transfer",
    status: "confirmed" as const,
    hash: "0x3a4b…5c6d",
    amount: "2,500 USDC",
    chain: "polygon" as const,
    time: "1 hr ago",
  },
  {
    id: "5",
    type: "Transfer",
    status: "failed" as const,
    hash: "0x7e8f…9a0b",
    amount: "500 USDC",
    chain: "optimism" as const,
    time: "3 hr ago",
  },
] as const;

export const MOCK_WORKFLOWS = [
  {
    id: "1",
    name: "Weekly Payroll",
    status: "active" as const,
    trigger: "cron",
    lastRun: "2 hours ago",
    nextRun: "Fri 09:00 UTC",
  },
  {
    id: "2",
    name: "Rebalance Portfolio",
    status: "active" as const,
    trigger: "threshold",
    lastRun: "6 hours ago",
    nextRun: "On trigger",
  },
  {
    id: "3",
    name: "Bridge to L2",
    status: "paused" as const,
    trigger: "manual",
    lastRun: "3 days ago",
    nextRun: "—",
  },
] as const;

export const MOCK_ASSETS = [
  { symbol: "ETH", name: "Ethereum", balance: "12.45", value: "$41,234.50", change: "+2.4%", chain: "ethereum" as const },
  { symbol: "USDC", name: "USD Coin", balance: "125,000", value: "$125,000.00", change: "0.0%", chain: "base" as const },
  { symbol: "LINK", name: "Chainlink", balance: "5,000", value: "$72,500.00", change: "+5.1%", chain: "ethereum" as const },
  { symbol: "USDC", name: "USD Coin", balance: "50,000", value: "$50,000.00", change: "0.0%", chain: "arbitrum" as const },
  { symbol: "ETH", name: "Ethereum", balance: "3.2", value: "$10,604.80", change: "+2.4%", chain: "optimism" as const },
] as const;
