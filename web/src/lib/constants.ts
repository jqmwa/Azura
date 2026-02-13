export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "home" as const },
  { label: "Automations", href: "/dashboard/automations", icon: "workflow" as const },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" as const },
] as const;

export const FEATURES = [
  {
    icon: "workflow" as const,
    title: "Auto-Rebalancing",
    description:
      "Azura watches your allocation targets and rebalances when they drift. No spreadsheets, no manual swaps.",
  },
  {
    icon: "crosschain" as const,
    title: "Cross-Chain Transfers",
    description:
      "Move funds between Ethereum, Base, Arbitrum, and more. Azura picks the cheapest route automatically.",
  },
  {
    icon: "code" as const,
    title: "Scheduled Payroll",
    description:
      "Set up recurring payments to contributors, vendors, or vaults. Azura executes on time, every time.",
  },
  {
    icon: "shield" as const,
    title: "Rule-Based Guardrails",
    description:
      "Define spending limits, approval thresholds, and whitelisted addresses. Azura operates within your boundaries.",
  },
  {
    icon: "monitor" as const,
    title: "Live Dashboard",
    description:
      "See every transaction, automation, and balance in one place. Real-time updates across all connected chains.",
  },
  {
    icon: "globe" as const,
    title: "Self-Serve Setup",
    description:
      "No sales calls, no onboarding queue. Install the CLI, connect your treasury, and Azura is ready to go.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Define",
    description: "Tell Azura what to do. Write your rules in TypeScript or configure them in the dashboard.",
    code: `import { Azura } from "azura";

const payroll = Azura.automation("weekly-payroll")
  .schedule("every friday at 9am")
  .send("USDC", {
    recipients: team,
    chain: "base",
  });`,
  },
  {
    step: 2,
    title: "Test",
    description: "Azura dry-runs everything against a forked chain before touching real funds.",
    code: `$ npx azura test weekly-payroll

✓ Forking Base at block 24,891,032
✓ Simulating 12 transfers...
✓ Total: 45,000 USDC → 12 recipients
✓ Estimated gas: 0.003 ETH
✓ All transfers valid. Ready to activate.`,
  },
  {
    step: 3,
    title: "Activate",
    description: "Turn it on. Azura takes over and you can watch from the dashboard.",
    code: `$ npx azura activate weekly-payroll

✓ Automation live on Base
✓ Schedule: Fridays 9:00 UTC
✓ Dashboard: azura.dev/d/0x1a2b
✓ Next run: Friday, Jan 10 09:00 UTC`,
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
