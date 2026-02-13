"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ASSETS } from "@/lib/constants";
import type { ChainId } from "@/types";

type Tab = "overview" | "assets";

const CHAIN_BREAKDOWN = [
  { color: "bg-chain-ethereum", label: "Ethereum", pct: "30%", value: "$89,801" },
  { color: "bg-chain-base", label: "Base", pct: "25%", value: "$74,835" },
  { color: "bg-chain-polygon", label: "Polygon", pct: "20%", value: "$59,868" },
  { color: "bg-purple-500", label: "Other", pct: "25%", value: "$74,835" },
];

export function PortfolioCard() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Header with tabs */}
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            Total Value Locked
          </p>
          <div className="flex items-end gap-3 mt-1">
            <span className="text-3xl font-bold tracking-tight text-gray-50">
              $299,339
            </span>
            <span className="mb-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              +3.2%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Across 5 chains</p>
        </div>
        <div className="flex rounded-lg border border-white/[0.06] bg-white/[0.03] p-0.5">
          <button
            onClick={() => setTab("overview")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "overview"
                ? "bg-purple-500/15 text-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("assets")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "assets"
                ? "bg-purple-500/15 text-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Assets
          </button>
        </div>
      </div>

      <CardContent className="pt-5">
        {tab === "overview" ? <OverviewTab /> : <AssetsTab />}
      </CardContent>
    </Card>
  );
}

function OverviewTab() {
  return (
    <div className="flex items-center gap-8">
      {/* Donut */}
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#1A1A24" strokeWidth="3.5" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#627EEA" strokeWidth="3.5"
            strokeDasharray="30 70" strokeDashoffset="0" strokeLinecap="round" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#0052FF" strokeWidth="3.5"
            strokeDasharray="25 75" strokeDashoffset="-30" strokeLinecap="round" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#8247E5" strokeWidth="3.5"
            strokeDasharray="20 80" strokeDashoffset="-55" strokeLinecap="round" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#6366F1" strokeWidth="3.5"
            strokeDasharray="25 75" strokeDashoffset="-75" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500">TVL</span>
          <span className="text-sm font-bold text-gray-50">$299K</span>
        </div>
      </div>

      {/* Chain breakdown */}
      <div className="flex flex-1 flex-col gap-3">
        {CHAIN_BREAKDOWN.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <span className="text-sm text-gray-300 flex-1">{item.label}</span>
            <span className="text-sm font-medium text-gray-50">{item.value}</span>
            <span className="text-xs text-gray-500 w-10 text-right">{item.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetsTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-left">
            <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Asset</th>
            <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Balance</th>
            <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Value</th>
            <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">24h</th>
            <th className="pb-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Chain</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_ASSETS.map((asset, i) => (
            <tr
              key={i}
              className={`transition-colors hover:bg-white/[0.02] ${
                i !== MOCK_ASSETS.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
            >
              <td className="py-3 pr-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-50">{asset.symbol}</span>
                  <span className="text-xs text-gray-500">{asset.name}</span>
                </div>
              </td>
              <td className="py-3 pr-4 font-mono text-gray-300">{asset.balance}</td>
              <td className="py-3 pr-4 text-gray-300">{asset.value}</td>
              <td className="py-3 pr-4">
                <span
                  className={
                    asset.change.startsWith("+")
                      ? "text-success"
                      : asset.change === "0.0%"
                        ? "text-gray-500"
                        : "text-error"
                  }
                >
                  {asset.change}
                </span>
              </td>
              <td className="py-3">
                <Badge chain={asset.chain as ChainId}>{asset.chain}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
