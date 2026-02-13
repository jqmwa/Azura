import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_AUTOMATIONS } from "@/lib/constants";
import type { WorkflowStatus as AutomationStatus } from "@/types";

const statusColor: Record<AutomationStatus, string> = {
  active: "bg-success",
  paused: "bg-warning",
  error: "bg-error",
};

const statusBadge: Record<AutomationStatus, "success" | "warning" | "error"> = {
  active: "success",
  paused: "warning",
  error: "error",
};

export function AutomationStatusCard() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-success/30 to-transparent" />

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Automations</CardTitle>
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            {MOCK_AUTOMATIONS.filter((a) => a.status === "active").length} active
          </span>
        </div>
      </CardHeader>
      <CardContent>
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
                    Last run: {auto.lastRun}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={statusBadge[auto.status as AutomationStatus]}>
                  {auto.status}
                </Badge>
                <Badge variant="default">{auto.trigger}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
