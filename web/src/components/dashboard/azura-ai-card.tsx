"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

const SUGGESTIONS = [
  "Rebalance my portfolio",
  "Bridge 10k USDC to Base",
  "Show gas fees across chains",
  "Set up weekly payroll",
];

export function AzuraAICard() {
  const [input, setInput] = useState("");

  return (
    <Card className="relative flex flex-col overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="flex flex-col gap-1.5 p-6 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border border-purple-500/20">
            <Icon name="sparkles" size={14} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-50">Ask Azura</h3>
        </div>
        <p className="text-sm text-gray-500">
          Describe what you want to do in plain English.
        </p>
      </div>

      <div className="flex-1 px-6 pb-3">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Bridge 5,000 USDC from Ethereum to Base..."
            rows={3}
            className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 pr-12 text-sm text-gray-50 placeholder:text-gray-600 focus:border-purple-500/40 focus:bg-white/[0.05] focus:outline-none transition-colors"
          />
          <button
            className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 text-white transition-all hover:bg-purple-400 hover:shadow-glow disabled:opacity-40 disabled:hover:bg-purple-500 disabled:hover:shadow-none"
            disabled={!input.trim()}
            aria-label="Send"
          >
            <Icon name="send" size={14} />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <p className="mb-2 text-xs font-medium tracking-wider text-gray-600 uppercase">
          Quick actions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
