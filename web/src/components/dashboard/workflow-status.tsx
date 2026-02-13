"use client";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { MOCK_AUTOMATIONS } from "@/lib/constants";
import type { WorkflowStatus as AutomationStatus } from "@/types";

const statusColor: Record<AutomationStatus, string> = {
  active: "bg-success",
  paused: "bg-warning",
  error: "bg-error",
};

export function AutomationStatusCard() {
  const activeCount = MOCK_AUTOMATIONS.filter((a) => a.status === "active").length;

  return (
    <Card className="relative flex flex-col overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="flex items-center justify-between p-6 pb-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold text-gray-50">Payroll</h3>
          <p className="text-sm text-gray-500">
            {activeCount} running, {MOCK_AUTOMATIONS.length - activeCount} paused
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-400 hover:shadow-glow">
          <Icon name="plus" size={14} />
          New
        </button>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="flex flex-col">
          {MOCK_AUTOMATIONS.map((auto, i) => (
            <div
              key={auto.id}
              className={`flex items-center justify-between py-3 ${
                i !== MOCK_AUTOMATIONS.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  {auto.status === "active" && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      statusColor[auto.status as AutomationStatus]
                    }`}
                  />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-gray-50">
                    {auto.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    Next: {auto.nextRun}
                  </span>
                </div>
              </div>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.06] text-gray-400 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-gray-50"
                aria-label={auto.status === "active" ? "Pause" : "Resume"}
              >
                <Icon
                  name={auto.status === "active" ? "pause" : "play"}
                  size={14}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
