export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "home" as const },
  { label: "Payroll", href: "/dashboard/payroll", icon: "workflow" as const },
  { label: "Faucet", href: "/dashboard/faucet", icon: "droplet" as const },
  { label: "Contracts", href: "/dashboard/contracts", icon: "file-code" as const },
  { label: "Simulator", href: "/dashboard/simulator", icon: "terminal" as const },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" as const },
] as const;

export const FEATURES = [
  {
    icon: "workflow" as const,
    title: "AI-Managed Portfolio",
    description:
      "Azura's AI agent monitors your Bitcoin, Ethereum, and stablecoin holdings — rebalancing automatically when your allocation drifts.",
  },
  {
    icon: "crosschain" as const,
    title: "Multi-Chain Treasury",
    description:
      "Hold assets across Ethereum, Base, Arbitrum, and more. Azura moves funds to the best chain for your business automatically.",
  },
  {
    icon: "code" as const,
    title: "Automated Payroll",
    description:
      "Pay your team and vendors in crypto on schedule. Azura handles recurring USDC, ETH, or BTC payments without manual work.",
  },
  {
    icon: "shield" as const,
    title: "Treasury Guardrails",
    description:
      "Set spending limits, approval thresholds, and whitelisted addresses. Your AI agent always operates within your rules.",
  },
  {
    icon: "monitor" as const,
    title: "Real-Time Overview",
    description:
      "Track every asset, transaction, and automation across all chains. Your company's full digital treasury in one dashboard.",
  },
  {
    icon: "globe" as const,
    title: "Get Started in Minutes",
    description:
      "No sales calls or onboarding queues. Connect your business wallet, fund it with BTC, ETH, or USDC, and Azura takes it from there.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Connect",
    description: "Link your business wallet and deposit Bitcoin, Ethereum, or stablecoins. Azura connects to your treasury in minutes.",
    code: `$ npx azura init

? Company name: Acme Corp
? Connect wallet: 0x1a2b...3c4d
? Initial assets: BTC, ETH, USDC
✓ Treasury connected
✓ Dashboard: azura.dev/d/acme-corp`,
  },
  {
    step: 2,
    title: "Configure",
    description: "Set your rules — allocation targets, spending limits, payroll schedules. Tell Azura how to manage your treasury.",
    code: `import { Azura } from "azura";

const treasury = Azura.treasury("acme-corp")
  .allocate({ BTC: "40%", ETH: "30%", USDC: "30%" })
  .rebalance("when drift > 5%")
  .payroll("every friday", { recipients: team });`,
  },
  {
    step: 3,
    title: "Let Azura Run",
    description: "Your AI agent takes over. Rebalancing, payments, and cross-chain moves happen automatically while you focus on your business.",
    code: `$ npx azura status

Treasury: Acme Corp
✓ AI Agent: Active
✓ Portfolio: BTC 40% · ETH 30% · USDC 30%
✓ Next payroll: Friday 09:00 UTC
✓ Last rebalance: 3 hours ago
✓ 30d savings: $4,210 in gas fees`,
  },
] as const;

export const COMPARISON_DIMENSIONS = [
  { key: "selfServe", label: "Self-Serve" },
  { key: "programmable", label: "Programmable" },
  { key: "automated", label: "Automations" },
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

export const MOCK_AUTOMATIONS = [
  {
    id: "1",
    name: "Weekly Payroll",
    status: "active" as const,
    trigger: "schedule",
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
