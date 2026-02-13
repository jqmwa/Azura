"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { fadeInUp, scaleIn } from "@/lib/motion";

export function DashboardPreview() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <MotionWrapper variants={fadeInUp} className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wider text-purple-400 uppercase">
            Dashboard
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Your company&apos;s assets,{" "}
            <span className="text-cyan-400">
              one dashboard
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            See your BTC, ETH, and stablecoin holdings across every chain.
            Track what your AI agent is doing in real time.
          </p>
        </MotionWrapper>

        {/* Dashboard mock */}
        <MotionWrapper variants={scaleIn}>
          <div className="rounded-2xl border border-white/[0.08] bg-gray-900/60 backdrop-blur-xl shadow-xl overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-error/40" />
              <div className="h-3 w-3 rounded-full bg-warning/40" />
              <div className="h-3 w-3 rounded-full bg-success/40" />
              <span className="ml-3 text-xs font-mono text-gray-600">
                azura.dev/dashboard
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Connected
                </span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 lg:p-8">
              {/* Top stats row */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
                {[
                  { label: "Total Value Locked", value: "$2,847,391", change: "+12.4%", up: true },
                  { label: "Active Workflows", value: "7", change: "+2 this week", up: true },
                  { label: "Transactions (30d)", value: "342", change: "+18%", up: true },
                  { label: "Gas Saved", value: "$4,210", change: "vs manual", up: true },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-50 lg:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-success">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-5">
                {/* Chart area — left 3 cols */}
                <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-200">Portfolio Performance</span>
                    <div className="flex gap-1">
                      {["7d", "30d", "90d"].map((period) => (
                        <button
                          key={period}
                          className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                            period === "30d"
                              ? "bg-purple-500/15 text-purple-400"
                              : "text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-40 lg:h-52">
                    <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="50%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                        <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      {[40, 80, 120, 160].map((y) => (
                        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" />
                      ))}
                      {/* Area */}
                      <path
                        d="M0 160 L40 155 L80 150 L120 140 L160 145 L200 130 L240 125 L280 110 L320 115 L360 95 L400 85 L440 90 L480 70 L520 60 L560 55 L600 50 L600 200 L0 200Z"
                        fill="url(#dashFill)"
                      />
                      {/* Line */}
                      <path
                        d="M0 160 L40 155 L80 150 L120 140 L160 145 L200 130 L240 125 L280 110 L320 115 L360 95 L400 85 L440 90 L480 70 L520 60 L560 55 L600 50"
                        fill="none"
                        stroke="url(#dashGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Current point */}
                      <circle cx="600" cy="50" r="4" fill="#22D3EE" />
                      <circle cx="600" cy="50" r="8" fill="#22D3EE" opacity="0.2" />
                    </svg>
                  </div>
                </div>

                {/* Right column — workflows + recent tx */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {/* Workflows */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-sm font-semibold text-gray-200">Active Workflows</span>
                    <div className="mt-3 space-y-2">
                      {[
                        { name: "Auto-Rebalance", status: "running", trigger: "threshold", color: "#10B981" },
                        { name: "Weekly Payroll", status: "scheduled", trigger: "cron", color: "#F59E0B" },
                        { name: "Bridge to L2", status: "running", trigger: "manual", color: "#10B981" },
                        { name: "Yield Harvest", status: "paused", trigger: "cron", color: "#8888A0" },
                      ].map((wf) => (
                        <div key={wf.name} className="flex items-center justify-between rounded-lg bg-gray-800/30 border border-white/[0.03] px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: wf.color }} />
                            <span className="text-xs text-gray-200">{wf.name}</span>
                          </div>
                          <span className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">{wf.trigger}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent transactions */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-sm font-semibold text-gray-200">Recent Activity</span>
                    <div className="mt-3 space-y-2">
                      {[
                        { action: "Swapped 5 ETH → USDC", chain: "Arbitrum", time: "2m ago", color: "#2D374B" },
                        { action: "Bridged 10k USDC", chain: "Base", time: "18m ago", color: "#0052FF" },
                        { action: "Payroll: 12 transfers", chain: "Base", time: "1h ago", color: "#0052FF" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-gray-800/30 border border-white/[0.03] px-3 py-2">
                          <span className="text-xs text-gray-300">{tx.action}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tx.color }} />
                            <span className="text-[10px] text-gray-600">{tx.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow underneath */}
          <div className="mx-auto -mt-4 h-8 w-2/3 rounded-full bg-purple-500/10 blur-2xl" />
        </MotionWrapper>
      </div>
    </section>
  );
}
